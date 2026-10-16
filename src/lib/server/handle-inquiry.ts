import "server-only";
import { siteUrl } from "@/content/site";
import { LIMITS, normalize, toInquiry, validate, type FieldErrors } from "@/lib/inquiry";
import { buildHtml, buildSubject, buildText } from "./email-template";
import {
  clientIp,
  findDuplicate,
  fingerprint,
  isAllowedOrigin,
  newReference,
  rateLimit,
  rememberSubmission,
  verifyTurnstile,
} from "./guards";
import { sendMail } from "./mailer";

export type InquiryResponse =
  | { ok: true; reference: string }
  | {
      ok: false;
      code: "invalid" | "rate-limited" | "forbidden" | "too-fast" | "verification" | "unavailable" | "failed" | "bad-request";
      message: string;
      fields?: FieldErrors;
    };

const json = (body: InquiryResponse, status: number, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const log = (event: string, data: Record<string, unknown>) =>
  // Privacy-conscious: references and coarse metadata only — never names, emails, phones or messages.
  console.info(JSON.stringify({ scope: "inquiry", event, ...data }));

export async function handleInquiry(request: Request): Promise<Response> {
  const allowed = [siteUrl, ...(process.env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean)];
  if (!isAllowedOrigin(request.headers.get("origin"), request.headers.get("host"), allowed)) {
    return json({ ok: false, code: "forbidden", message: "This form can only be submitted from our website." }, 403);
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ ok: false, code: "bad-request", message: "Unsupported request." }, 415);
  }

  const ip = clientIp(request.headers);
  const limited = rateLimit(ip);
  if (!limited.ok) {
    log("rate_limited", {});
    return json(
      { ok: false, code: "rate-limited", message: "You've sent several requests in a short time. Please wait a few minutes and try again." },
      429,
      { "Retry-After": String(limited.retryAfterSec) },
    );
  }

  const raw = await request.text();
  if (raw.length > LIMITS.maxBodyBytes) {
    return json({ ok: false, code: "bad-request", message: "Your message is too long. Please shorten it and try again." }, 413);
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad-request", message: "Unsupported request." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Accept quietly so bots don't adapt; send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    log("honeypot", {});
    return json({ ok: true, reference: newReference() }, 200);
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < LIMITS.minFillMs) {
    return json({ ok: false, code: "too-fast", message: "That was quicker than we expected. Please review your details and submit again." }, 400);
  }

  const input = normalize(body);
  const fields = validate(input);
  if (Object.keys(fields).length) {
    return json({ ok: false, code: "invalid", message: "Please fix the highlighted fields.", fields }, 422);
  }

  if (!(await verifyTurnstile(typeof body.turnstileToken === "string" ? body.turnstileToken : "", ip))) {
    return json({ ok: false, code: "verification", message: "We couldn't verify the security check. Please try it again." }, 400);
  }

  const inquiry = toInquiry(input);
  const fp = fingerprint([
    inquiry.formType,
    inquiry.email,
    inquiry.inquiryType,
    inquiry.containerSize,
    String(inquiry.quantity),
    inquiry.deliveryZip,
    inquiry.message,
  ]);
  const duplicate = findDuplicate(fp);
  if (duplicate) {
    log("duplicate", { reference: duplicate });
    return json({ ok: true, reference: duplicate }, 200);
  }

  const reference = newReference();
  const result = await sendMail({
    subject: buildSubject(inquiry),
    html: buildHtml(inquiry, reference),
    text: buildText(inquiry, reference),
    replyTo: inquiry.email,
    idempotencyKey: `inquiry-${fp}`,
  });

  if (!result.ok) {
    console.error(JSON.stringify({ scope: "inquiry", event: "send_failed", reason: result.reason, status: result.status, reference }));
    if (result.reason === "not-configured") {
      return json({ ok: false, code: "unavailable", message: "Online requests are temporarily unavailable." }, 503);
    }
    return json({ ok: false, code: "failed", message: "We couldn't send your request just now. Your details are still here — please try again." }, 502);
  }

  rememberSubmission(fp, reference);
  log("sent", { reference, providerId: result.id, formType: inquiry.formType, inquiryType: inquiry.inquiryType });
  return json({ ok: true, reference }, 200);
}
