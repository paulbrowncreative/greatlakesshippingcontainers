"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { business, phoneHref } from "@/content/business";
import { track } from "@/lib/analytics";
import {
  conditions,
  containerSizes,
  emptyInquiry,
  inquiryTypes,
  isProjectInquiry,
  LIMITS,
  labelFor,
  rentalDurations,
  stepFields,
  surfaces,
  timeframes,
  validate,
  type FieldErrors,
  type FormType,
  type InquiryInput,
  type StepId,
} from "@/lib/inquiry";
import { IconAlert, IconArrow, IconCheckCircle } from "./Icons";
import { Turnstile, turnstileEnabled } from "./Turnstile";

type Step = StepId | "review";
const STEP_LABELS: Record<Step, string> = { project: "Container", delivery: "Delivery", contact: "Contact", review: "Review" };

type Props = { mode: FormType; initial?: Partial<InquiryInput> };

export function InquiryForm({ mode, initial }: Props) {
  const router = useRouter();
  const uid = useId();
  const [values, setValues] = useState<InquiryInput>(() => ({ ...emptyInquiry(mode), ...initial }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [serverError, setServerError] = useState<{ title: string; body: string } | null>(null);
  const [token, setToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const startedAt = useRef(0);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const project = mode === "quote" && isProjectInquiry(values.inquiryType);
  const steps: Step[] = useMemo(
    () => (mode === "contact" ? ["contact"] : project ? ["project", "delivery", "contact", "review"] : ["project", "contact", "review"]),
    [mode, project],
  );
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [stepIndex]);

  const set = <K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: mode });
    }
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const errorsFor = (fields: (keyof InquiryInput)[]): FieldErrors => {
    const all = validate({ ...values, sourcePage: window.location.pathname });
    return Object.fromEntries(fields.filter((f) => all[f]).map((f) => [f, all[f]])) as FieldErrors;
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
    });
  };

  const next = () => {
    if (step === "review") return;
    const errs = errorsFor(stepFields[step]);
    setErrors(errs);
    if (Object.keys(errs).length) {
      track("form_error", { form: mode, step });
      focusFirstError(errs);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const goTo = (s: Step) => setStepIndex(Math.max(steps.indexOf(s), 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== "review" && step !== "contact") return next();
    if (mode === "quote" && step === "contact") return next();
    if (status === "submitting") return;

    const errs = errorsFor(Object.keys(values) as (keyof InquiryInput)[]);
    if (Object.keys(errs).length) {
      setErrors(errs);
      track("form_error", { form: mode, step: "submit" });
      const firstStep = steps.find((s) => s !== "review" && stepFields[s].some((f) => errs[f]));
      if (firstStep && firstStep !== step) goTo(firstStep);
      focusFirstError(errs);
      return;
    }
    if (turnstileEnabled && !token) {
      setServerError({ title: "One more step", body: "Please complete the security check above the submit button." });
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          sourcePage: window.location.pathname,
          startedAt: startedAt.current,
          website: honeypot.current?.value ?? "",
          turnstileToken: token,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true; reference: string }
        | { ok: false; code: string; message: string; fields?: FieldErrors }
        | null;

      if (res.ok && data?.ok) {
        track("generate_lead", { form: mode, inquiry_type: values.inquiryType, container_size: values.containerSize || undefined });
        router.push(`/thank-you?ref=${encodeURIComponent(data.reference)}&type=${mode}`);
        return;
      }

      setStatus("idle");
      setTurnstileReset((n) => n + 1);
      setToken("");
      track("form_error", { form: mode, step: "server", code: data && !data.ok ? data.code : res.status });
      if (data && !data.ok && data.fields) {
        setErrors(data.fields);
        const firstStep = steps.find((s) => s !== "review" && stepFields[s].some((f) => data.fields![f]));
        if (firstStep) goTo(firstStep);
        focusFirstError(data.fields);
        return;
      }
      const msg = data && !data.ok ? data.message : "Something went wrong on our end.";
      setServerError(
        data && !data.ok && data.code === "unavailable"
          ? { title: "Online requests are temporarily unavailable", body: "Your details haven’t been sent. Please reach us using the options below." }
          : { title: "Your request wasn’t sent", body: msg },
      );
    } catch {
      setStatus("idle");
      setServerError({
        title: "Your request wasn’t sent",
        body: "We couldn’t reach our server — check your connection and try again. Your details are still filled in.",
      });
    }
  };

  const tel = phoneHref();
  const headingId = `${uid}-heading`;
  const stepTitle: Record<Step, string> = {
    project: mode === "quote" ? "What do you need?" : "Send a message",
    delivery: "Where is it going?",
    contact: mode === "contact" ? "Send us a message" : "How can we reach you?",
    review: "Review your request",
  };

  return (
    <div className="form-shell">
      {mode === "quote" && (
        <div className="form-shell__head">
          <ol className="progress" aria-label="Quote request progress">
            {steps.map((s, i) => (
              <li key={s} data-state={i < stepIndex ? "done" : i === stepIndex ? "current" : "todo"} aria-current={i === stepIndex ? "step" : undefined}>
                <span>{STEP_LABELS[s]}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      <form ref={formRef} className="form-shell__body form" noValidate onSubmit={submit} aria-labelledby={headingId}>
        <div>
          <h2 id={headingId} ref={headingRef} tabIndex={-1} className="display" style={{ fontSize: "var(--fs-h3)", textTransform: "none" }}>
            {stepTitle[step]}
          </h2>
          {mode === "quote" && (
            <p className="muted small mt-2">
              Step {stepIndex + 1} of {steps.length}
              {step === "project" && " · Takes about 2 minutes. No technical knowledge needed."}
            </p>
          )}
        </div>

        <div aria-live="polite" className="sr-only">
          {Object.values(errors).filter(Boolean).length
            ? `${Object.values(errors).filter(Boolean).length} field${Object.values(errors).filter(Boolean).length > 1 ? "s need" : " needs"} attention.`
            : ""}
        </div>

        {step === "project" && (
          <>
            <ChoiceGroup
              name="inquiryType"
              legend="I’m looking to…"
              options={inquiryTypes}
              value={values.inquiryType}
              error={errors.inquiryType}
              onChange={(v) => set("inquiryType", v)}
            />
            {project && (
              <>
                <ChoiceGroup
                  name="containerSize"
                  legend="Container size"
                  hint={
                    <>
                      Not sure? Pick &ldquo;Not sure&rdquo; or{" "}
                      <Link href="/containers#size-chooser" target="_blank">
                        try the size chooser<span className="sr-only"> (opens in a new tab)</span>
                      </Link>
                      .
                    </>
                  }
                  options={containerSizes}
                  value={values.containerSize}
                  error={errors.containerSize}
                  onChange={(v) => set("containerSize", v)}
                />
                <div className="form-row form-row--2">
                  <SelectField
                    name="condition"
                    label="Condition"
                    optional
                    hint={<Link href="/containers/condition-grades" target="_blank">What do the grades mean?<span className="sr-only"> (opens in a new tab)</span></Link>}
                    options={conditions}
                    value={values.condition}
                    error={errors.condition}
                    onChange={(v) => set("condition", v)}
                  />
                  <Field name="quantity" label="How many?" error={errors.quantity}>
                    {(p) => (
                      <input
                        {...p}
                        className="input"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={LIMITS.maxQuantity}
                        step={1}
                        value={values.quantity}
                        onChange={(e) => set("quantity", e.target.value)}
                      />
                    )}
                  </Field>
                </div>
                {values.inquiryType === "rent" && (
                  <SelectField
                    name="rentalDuration"
                    label="How long do you need it?"
                    options={rentalDurations}
                    value={values.rentalDuration}
                    error={errors.rentalDuration}
                    onChange={(v) => set("rentalDuration", v)}
                  />
                )}
              </>
            )}
          </>
        )}

        {step === "delivery" && (
          <>
            <div className="form-row form-row--2">
              <Field name="deliveryZip" label="Delivery ZIP code" hint="Where the container will be placed." error={errors.deliveryZip}>
                {(p) => (
                  <input
                    {...p}
                    className="input"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={10}
                    value={values.deliveryZip}
                    onChange={(e) => set("deliveryZip", e.target.value)}
                  />
                )}
              </Field>
              <SelectField
                name="timeframe"
                label="When do you need it?"
                options={timeframes}
                value={values.timeframe}
                error={errors.timeframe}
                onChange={(v) => set("timeframe", v)}
              />
            </div>
            <SelectField
              name="surface"
              label="What will it sit on?"
              optional
              hint="A level, firm base keeps the doors working properly."
              options={surfaces}
              value={values.surface}
              error={errors.surface}
              onChange={(v) => set("surface", v)}
            />
            <Field
              name="accessNotes"
              label="Anything about site access?"
              optional
              hint="Gate width, overhead wires or branches, slopes, soft ground, which way the doors should face."
              error={errors.accessNotes}
            >
              {(p) => (
                <textarea
                  {...p}
                  className="textarea"
                  rows={3}
                  maxLength={LIMITS.accessNotes}
                  value={values.accessNotes}
                  onChange={(e) => set("accessNotes", e.target.value)}
                />
              )}
            </Field>
          </>
        )}

        {step === "contact" && (
          <>
            <div className="form-row form-row--2">
              <Field name="name" label="Full name" error={errors.name}>
                {(p) => <input {...p} className="input" autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={(e) => set("name", e.target.value)} />}
              </Field>
              <Field name="company" label="Company" optional error={errors.company}>
                {(p) => (
                  <input {...p} className="input" autoComplete="organization" maxLength={LIMITS.company} value={values.company} onChange={(e) => set("company", e.target.value)} />
                )}
              </Field>
            </div>
            <div className="form-row form-row--2">
              <Field name="email" label="Email" error={errors.email}>
                {(p) => (
                  <input {...p} className="input" type="email" autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={(e) => set("email", e.target.value)} />
                )}
              </Field>
              <Field name="phone" label="Phone" optional={mode === "contact"} hint={mode === "quote" ? "For delivery questions only." : undefined} error={errors.phone}>
                {(p) => (
                  <input {...p} className="input" type="tel" autoComplete="tel" maxLength={LIMITS.phone} value={values.phone} onChange={(e) => set("phone", e.target.value)} />
                )}
              </Field>
            </div>
            <Field
              name="message"
              label={mode === "contact" ? "How can we help?" : "Anything else we should know?"}
              optional={mode === "quote"}
              hint={mode === "quote" ? "What you’ll store, special requirements, or questions." : undefined}
              error={errors.message}
            >
              {(p) => (
                <textarea {...p} className="textarea" rows={mode === "contact" ? 6 : 4} maxLength={LIMITS.message} value={values.message} onChange={(e) => set("message", e.target.value)} />
              )}
            </Field>
            <ConsentField checked={values.consent} error={errors.consent} onChange={(v) => set("consent", v)} />
          </>
        )}

        {step === "review" && <Review values={values} onEdit={goTo} steps={steps} />}

        {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input ref={honeypot} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        {(step === "review" || mode === "contact") && <Turnstile onToken={setToken} resetSignal={turnstileReset} />}

        {serverError && (
          <div className="alert alert--error" role="alert">
            <IconAlert />
            <div>
              <strong>{serverError.title}</strong>
              <p>{serverError.body}</p>
              <p className="mt-2">
                {tel && (
                  <>
                    Call <a href={tel}>{business.phone}</a> or{" "}
                  </>
                )}
                message us on{" "}
                <a href={business.social.facebook} target="_blank" rel="noopener">
                  Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </div>
          </div>
        )}

        <div className="form-actions">
          {stepIndex > 0 ? (
            <button type="button" className="btn btn--secondary" onClick={back} disabled={status === "submitting"}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step === "review" || mode === "contact" ? (
            <button type="submit" className="btn btn--lg" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <span className="spinner" aria-hidden /> Sending…
                </>
              ) : mode === "quote" ? (
                <>
                  Send Quote Request <IconArrow />
                </>
              ) : (
                <>
                  Send Message <IconArrow />
                </>
              )}
            </button>
          ) : (
            <button type="submit" className="btn btn--lg">
              {steps[stepIndex + 1] === "review" ? "Review Request" : "Continue"} <IconArrow />
            </button>
          )}
        </div>
        <p className="muted small" style={{ fontSize: "var(--fs-xs)" }}>
          We use your details only to respond to this request — never sold or added to marketing lists. See our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
        <div aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your request…" : ""}
        </div>
      </form>
    </div>
  );
}

/* ---------- Field primitives ---------- */

type FieldProps = {
  name: keyof InquiryInput;
  label: string;
  hint?: ReactNode;
  optional?: boolean;
  error?: string;
  children: (p: { id: string; name: string; "aria-invalid"?: true; "aria-describedby"?: string; required?: boolean }) => ReactNode;
};

function Field({ name, label, hint, optional, error, children }: FieldProps) {
  const id = `f-${name}`;
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field" data-invalid={error ? "true" : undefined}>
      <label htmlFor={id}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {children({ id, name, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, required: !optional || undefined })}
      {error && <FieldError id={`${id}-error`} message={error} />}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <span className="field-error" id={id}>
      <IconAlert /> {message}
    </span>
  );
}

function SelectField(props: {
  name: keyof InquiryInput;
  label: string;
  hint?: ReactNode;
  optional?: boolean;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field name={props.name} label={props.label} hint={props.hint} optional={props.optional} error={props.error}>
      {(p) => (
        <select {...p} className="select" value={props.value} onChange={(e) => props.onChange(e.target.value)}>
          <option value="">{props.optional ? "Choose (optional)" : "Choose one"}</option>
          {props.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

function ChoiceGroup(props: {
  name: keyof InquiryInput;
  legend: string;
  hint?: ReactNode;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const id = `f-${props.name}`;
  const describedBy = [props.hint ? `${id}-hint` : "", props.error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset className="field" data-invalid={props.error ? "true" : undefined} aria-describedby={describedBy}>
      <legend>{props.legend}</legend>
      {props.hint && (
        <span className="hint" id={`${id}-hint`}>
          {props.hint}
        </span>
      )}
      <div className="choice-grid">
        {props.options.map((o) => (
          <label key={o.value} className="choice">
            <input
              type="radio"
              name={props.name}
              value={o.value}
              checked={props.value === o.value}
              onChange={() => props.onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {props.error && <FieldError id={`${id}-error`} message={props.error} />}
    </fieldset>
  );
}

function ConsentField({ checked, error, onChange }: { checked: boolean; error?: string; onChange: (v: boolean) => void }) {
  return (
    <div className="field" data-invalid={error ? "true" : undefined}>
      <label className="check" htmlFor="f-consent">
        <input
          id="f-consent"
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "f-consent-error" : undefined}
        />
        <span>
          {business.name} may contact me by email or phone about this request.
        </span>
      </label>
      {error && <FieldError id="f-consent-error" message={error} />}
    </div>
  );
}

function Review({ values, onEdit, steps }: { values: InquiryInput; onEdit: (s: Step) => void; steps: Step[] }) {
  const project = isProjectInquiry(values.inquiryType);
  const rows = (pairs: [string, string][]) => (
    <dl>
      {pairs
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} style={{ display: "contents" }}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
    </dl>
  );
  return (
    <div className="summary" aria-label="Your request">
      <section className="summary__group">
        <header>
          <h3>Container</h3>
          <button type="button" onClick={() => onEdit("project")}>
            Edit<span className="sr-only"> container details</span>
          </button>
        </header>
        {rows([
          ["Request", labelFor(inquiryTypes, values.inquiryType)],
          ...(project
            ? ([
                ["Size", labelFor(containerSizes, values.containerSize)],
                ["Condition", values.condition ? labelFor(conditions, values.condition) : "No preference"],
                ["Quantity", values.quantity],
                ["Rental length", values.inquiryType === "rent" ? labelFor(rentalDurations, values.rentalDuration) : ""],
              ] as [string, string][])
            : []),
        ])}
      </section>
      {steps.includes("delivery") && (
        <section className="summary__group">
          <header>
            <h3>Delivery</h3>
            <button type="button" onClick={() => onEdit("delivery")}>
              Edit<span className="sr-only"> delivery details</span>
            </button>
          </header>
          {rows([
            ["ZIP code", values.deliveryZip],
            ["Needed", labelFor(timeframes, values.timeframe)],
            ["Surface", values.surface ? labelFor(surfaces, values.surface) : ""],
            ["Site notes", values.accessNotes],
          ])}
        </section>
      )}
      <section className="summary__group">
        <header>
          <h3>Contact</h3>
          <button type="button" onClick={() => onEdit("contact")}>
            Edit<span className="sr-only"> contact details</span>
          </button>
        </header>
        {rows([
          ["Name", values.name],
          ["Company", values.company],
          ["Email", values.email],
          ["Phone", values.phone],
          ["Message", values.message],
        ])}
      </section>
      <p className="small muted summary__group" style={{ display: "flex", gap: "0.5rem" }}>
        <IconCheckCircle style={{ width: "1.1rem", flex: "none", color: "var(--success)" }} />
        Looks right? Send it and we’ll reply by email. Your quote will confirm the exact unit, delivery cost and timing.
      </p>
    </div>
  );
}
