import "server-only";
import { business } from "@/content/business";
import { absoluteUrl } from "@/content/site";
import {
  conditions,
  containerSizes,
  inquiryTypes,
  labelFor,
  rentalDurations,
  surfaces,
  timeframes,
  type Inquiry,
} from "@/lib/inquiry";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip characters that could break an email header. */
const headerSafe = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export function buildSubject(i: Inquiry): string {
  const base = "New Website Inquiry — Great Lakes Shipping Containers";
  if (i.formType === "contact" || i.quantity === null) {
    return headerSafe(`${base} | Question from ${i.name}`);
  }
  const type = labelFor(inquiryTypes, i.inquiryType).replace(/ a container$/i, "");
  const size = labelFor(containerSizes, i.containerSize);
  return headerSafe(`${base} | ${type}: ${i.quantity} × ${size} · ZIP ${i.deliveryZip}`);
}

type Row = [label: string, value: string];

function rows(i: Inquiry): { project: Row[]; contact: Row[] } {
  const project: Row[] = [];
  project.push(["Request", labelFor(inquiryTypes, i.inquiryType)]);
  if (i.quantity !== null) {
    project.push(["Container", labelFor(containerSizes, i.containerSize)]);
    project.push(["Quantity", String(i.quantity)]);
    if (i.condition) project.push(["Condition", labelFor(conditions, i.condition)]);
    if (i.rentalDuration) project.push(["Rental length", labelFor(rentalDurations, i.rentalDuration)]);
    project.push(["Delivery ZIP", i.deliveryZip]);
    project.push(["Needed by", labelFor(timeframes, i.timeframe)]);
    if (i.surface) project.push(["Placement surface", labelFor(surfaces, i.surface)]);
    if (i.accessNotes) project.push(["Site access notes", i.accessNotes]);
  }
  const contact: Row[] = [["Name", i.name]];
  if (i.company) contact.push(["Company", i.company]);
  contact.push(["Email", i.email]);
  if (i.phone) contact.push(["Phone", i.phone]);
  return { project, contact };
}

export function buildText(i: Inquiry, reference: string): string {
  const { project, contact } = rows(i);
  const fmt = (r: Row[]) => r.map(([k, v]) => `${k}: ${v}`).join("\n");
  return [
    `New ${i.formType === "quote" ? "quote request" : "message"} from ${absoluteUrl("/")}`,
    "",
    "PROJECT",
    fmt(project),
    "",
    "CONTACT",
    fmt(contact),
    "",
    "MESSAGE",
    i.message || "(none)",
    "",
    `Submitted from: ${i.sourcePage || "unknown page"}`,
    `Reference: ${reference}`,
    "",
    "Reply to this email to respond directly to the customer.",
  ].join("\n");
}

export function buildHtml(i: Inquiry, reference: string): string {
  const { project, contact } = rows(i);
  const table = (r: Row[]) =>
    r
      .map(
        ([k, v]) =>
          `<tr><th align="left" valign="top" style="padding:8px 12px 8px 0;color:#5b6b7b;font-weight:600;white-space:nowrap;font-size:14px">${escapeHtml(k)}</th><td style="padding:8px 0;color:#0b1f33;font-size:15px">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("");
  const phoneDigits = i.phone.replace(/[^\d+]/g, "");
  const section = (title: string, body: string) =>
    `<h2 style="margin:28px 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#b5441a">${title}</h2>${body}`;

  return `<!doctype html><html><body style="margin:0;background:#f4f2ed;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ed;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-top:6px solid #b5441a">
<tr><td style="padding:24px 28px;background:#0b1f33;color:#ffffff">
<div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#9fb6cc">${escapeHtml(business.name)}</div>
<div style="font-size:22px;font-weight:700;margin-top:6px">New website ${i.formType === "quote" ? "quote request" : "message"}</div>
</td></tr>
<tr><td style="padding:8px 28px 28px">
${section("Project", `<table role="presentation" cellpadding="0" cellspacing="0">${table(project)}</table>`)}
${section("Contact", `<table role="presentation" cellpadding="0" cellspacing="0">${table(contact)}</table>`)}
${section("Message", `<p style="margin:0;color:#0b1f33;font-size:15px;line-height:1.55">${i.message ? escapeHtml(i.message).replace(/\n/g, "<br>") : "<em>No message</em>"}</p>`)}
<p style="margin:28px 0 0">
<a href="mailto:${escapeHtml(i.email)}" style="display:inline-block;background:#b5441a;color:#ffffff;text-decoration:none;padding:12px 18px;font-weight:700">Reply by email</a>
${phoneDigits ? `&nbsp;<a href="tel:${escapeHtml(phoneDigits)}" style="display:inline-block;border:2px solid #0b1f33;color:#0b1f33;text-decoration:none;padding:10px 16px;font-weight:700">Call ${escapeHtml(i.phone)}</a>` : ""}
</p>
<p style="margin:28px 0 0;color:#5b6b7b;font-size:12px;line-height:1.5">Submitted from ${escapeHtml(i.sourcePage || "unknown page")} · Reference ${escapeHtml(reference)}</p>
</td></tr></table></td></tr></table></body></html>`;
}
