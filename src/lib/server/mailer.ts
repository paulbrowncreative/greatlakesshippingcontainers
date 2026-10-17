import "server-only";

export type MailMessage = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
  idempotencyKey: string;
};

export type MailResult =
  | { ok: true; id: string }
  | { ok: false; reason: "not-configured" | "provider-error" | "network-error"; status?: number };

export const DEFAULT_RECIPIENT = "chris@stierenterprise.com";

export function mailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.INQUIRY_FROM_EMAIL || "",
    to: (process.env.INQUIRY_TO_EMAIL || DEFAULT_RECIPIENT)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    // Overridable for automated tests against a local mock; never set in production.
    apiUrl: (process.env.RESEND_API_URL || "https://api.resend.com").replace(/\/$/, ""),
  };
}

export function isMailConfigured(): boolean {
  const c = mailConfig();
  return Boolean(c.apiKey && c.from && c.to.length);
}

/**
 * Sends through Resend’s REST API. Success is reported only when Resend accepts the
 * message and returns an id. The idempotency key makes a retried request with the
 * same content a no-op on Resend’s side (24h window), preventing duplicate emails.
 */
export async function sendMail(msg: MailMessage): Promise<MailResult> {
  const c = mailConfig();
  if (!isMailConfigured()) return { ok: false, reason: "not-configured" };

  try {
    const res = await fetch(`${c.apiUrl}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": msg.idempotencyKey,
      },
      body: JSON.stringify({
        from: c.from,
        to: c.to,
        reply_to: msg.replyTo,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        tags: [{ name: "source", value: "website" }],
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, reason: "provider-error", status: res.status };
    const data = (await res.json().catch(() => null)) as { id?: string } | null;
    if (!data?.id) return { ok: false, reason: "provider-error", status: res.status };
    return { ok: true, id: data.id };
  } catch {
    return { ok: false, reason: "network-error" };
  }
}
