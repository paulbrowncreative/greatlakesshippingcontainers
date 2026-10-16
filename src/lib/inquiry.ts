/**
 * Inquiry schema shared by the browser (instant feedback) and the API route
 * (authoritative validation). Kept dependency-free on purpose.
 */
import { offers } from "@/content/business";

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  zip: 10,
  message: 3000,
  accessNotes: 600,
  maxQuantity: 50,
  maxBodyBytes: 24_000,
  minFillMs: 3_000,
} as const;

type Option = { value: string; label: string };

export const inquiryTypes: Option[] = [
  { value: "buy", label: "Buy a container" },
  ...(offers("rental") ? [{ value: "rent", label: "Rent a container" }] : []),
  ...(offers("modifications") ? [{ value: "modify", label: "Custom modification" }] : []),
  { value: "question", label: "I have a question" },
];

export const containerSizes: Option[] = [
  { value: "20-standard", label: "20 ft standard" },
  { value: "40-standard", label: "40 ft standard" },
  { value: "40-high-cube", label: "40 ft high cube" },
  { value: "20-high-cube", label: "20 ft high cube" },
  { value: "other", label: "Other / specialty size" },
  { value: "not-sure", label: "Not sure — help me choose" },
];

export const conditions: Option[] = [
  { value: "new", label: "New / one-trip" },
  { value: "cargo-worthy", label: "Used — cargo-worthy" },
  { value: "wind-water-tight", label: "Used — wind & water tight" },
  { value: "not-sure", label: "Not sure — recommend one" },
];

export const timeframes: Option[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months out" },
  { value: "researching", label: "Just researching" },
];

export const surfaces: Option[] = [
  { value: "concrete", label: "Concrete" },
  { value: "asphalt", label: "Asphalt" },
  { value: "gravel", label: "Compacted gravel" },
  { value: "dirt-grass", label: "Dirt or grass" },
  { value: "not-sure", label: "Not sure yet" },
];

export const rentalDurations: Option[] = [
  { value: "1-3", label: "1–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "12+", label: "12 months or longer" },
];

export type FormType = "quote" | "contact";

export type InquiryInput = {
  formType: FormType;
  inquiryType: string;
  containerSize: string;
  condition: string;
  quantity: string;
  deliveryZip: string;
  timeframe: string;
  surface: string;
  accessNotes: string;
  rentalDuration: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  consent: boolean;
  sourcePage: string;
};

export type Inquiry = Omit<InquiryInput, "quantity"> & { quantity: number | null };

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

export const emptyInquiry = (formType: FormType): InquiryInput => ({
  formType,
  inquiryType: formType === "contact" ? "question" : "buy",
  containerSize: "",
  condition: "",
  quantity: "1",
  deliveryZip: "",
  timeframe: "",
  surface: "",
  accessNotes: "",
  rentalDuration: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  consent: false,
  sourcePage: "",
});

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;
// Strip control characters except tab/newline; collapse to a sane, printable string.
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let v = value.replace(CONTROL_RE, "");
  v = multiline ? v.replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n") : v.replace(/\s+/g, " ");
  return v.trim().slice(0, max);
}

const isOption = (list: Option[], v: string) => list.some((o) => o.value === v);

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** Does this inquiry need the container/delivery questions? */
export function isProjectInquiry(inquiryType: string): boolean {
  return inquiryType === "buy" || inquiryType === "rent" || inquiryType === "modify";
}

/** Normalize untrusted input into a predictable shape. Never throws. */
export function normalize(raw: unknown): InquiryInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const formType: FormType = r.formType === "contact" ? "contact" : "quote";
  return {
    formType,
    inquiryType: clean(r.inquiryType, 20),
    containerSize: clean(r.containerSize, 20),
    condition: clean(r.condition, 20),
    quantity: clean(String(r.quantity ?? ""), 4),
    deliveryZip: clean(r.deliveryZip, LIMITS.zip),
    timeframe: clean(r.timeframe, 20),
    surface: clean(r.surface, 20),
    accessNotes: clean(r.accessNotes, LIMITS.accessNotes, true),
    rentalDuration: clean(r.rentalDuration, 10),
    name: clean(r.name, LIMITS.name),
    email: clean(r.email, LIMITS.email).toLowerCase(),
    phone: clean(r.phone, LIMITS.phone),
    company: clean(r.company, LIMITS.company),
    message: clean(r.message, LIMITS.message, true),
    consent: r.consent === true || r.consent === "true" || r.consent === "on",
    sourcePage: clean(r.sourcePage, 200),
  };
}

export type StepId = "project" | "delivery" | "contact";

/** Fields validated at each quote-form step (contact form validates all at once). */
export const stepFields: Record<StepId, (keyof InquiryInput)[]> = {
  project: ["inquiryType", "containerSize", "condition", "quantity", "rentalDuration"],
  delivery: ["deliveryZip", "timeframe", "surface", "accessNotes"],
  contact: ["name", "email", "phone", "company", "message", "consent"],
};

export function validate(input: InquiryInput): FieldErrors {
  const e: FieldErrors = {};
  const project = input.formType === "quote" && isProjectInquiry(input.inquiryType);

  if (!isOption(inquiryTypes, input.inquiryType)) e.inquiryType = "Choose what you need help with.";

  if (project) {
    if (!isOption(containerSizes, input.containerSize)) e.containerSize = "Choose a size, or pick “Not sure”.";
    if (input.condition && !isOption(conditions, input.condition)) e.condition = "Choose a condition from the list.";
    const qty = Number(input.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > LIMITS.maxQuantity) {
      e.quantity = `Enter a whole number from 1 to ${LIMITS.maxQuantity}.`;
    }
    if (input.inquiryType === "rent" && !isOption(rentalDurations, input.rentalDuration)) {
      e.rentalDuration = "Choose roughly how long you need it.";
    }
    if (!ZIP_RE.test(input.deliveryZip)) e.deliveryZip = "Enter the 5-digit ZIP code where the container will go.";
    if (!isOption(timeframes, input.timeframe)) e.timeframe = "Choose when you need it.";
    if (input.surface && !isOption(surfaces, input.surface)) e.surface = "Choose a surface from the list.";
  }

  if (input.name.length < 2) e.name = "Enter your name.";
  if (!EMAIL_RE.test(input.email)) e.email = "Enter a valid email address, like name@company.com.";

  const digits = phoneDigits(input.phone);
  const phoneRequired = input.formType === "quote";
  if (phoneRequired && !input.phone) e.phone = "Enter a phone number so we can confirm delivery details.";
  else if (input.phone && (digits.length < 10 || digits.length > 15)) e.phone = "Enter a 10-digit phone number.";

  if (input.formType === "contact" && input.message.length < 10) {
    e.message = "Tell us a little about what you need (at least 10 characters).";
  }
  if (countLinks(input.message) + countLinks(input.accessNotes) > 2) {
    e.message = "Please remove links from your message — we'll ask for anything we need.";
  }
  if (!input.consent) e.consent = "Please confirm we can contact you about this request.";

  return e;
}

export function countLinks(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) || []).length;
}

/** Converts validated input into the canonical record used by the email template. */
export function toInquiry(input: InquiryInput): Inquiry {
  const project = input.formType === "quote" && isProjectInquiry(input.inquiryType);
  return {
    ...input,
    quantity: project ? Number(input.quantity) : null,
    containerSize: project ? input.containerSize : "",
    condition: project ? input.condition : "",
    deliveryZip: project ? input.deliveryZip : "",
    timeframe: project ? input.timeframe : "",
    surface: project ? input.surface : "",
    accessNotes: project ? input.accessNotes : "",
    rentalDuration: project && input.inquiryType === "rent" ? input.rentalDuration : "",
  };
}

export function labelFor(list: Option[], value: string): string {
  return list.find((o) => o.value === value)?.label ?? value;
}
