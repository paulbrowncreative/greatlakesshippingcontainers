import "server-only";
import { createHash } from "node:crypto";

/**
 * Best-effort, per-instance abuse controls. On serverless hosts each warm instance
 * keeps its own memory, so these limit bursts rather than guarantee global limits.
 * Turnstile (when configured) and Resend idempotency cover the rest.
 */

type Window = { count: number; resetAt: number };
const buckets = new Map<string, Window>();
const recent = new Map<string, { at: number; reference: string }>();

export const RATE_LIMITS = [
  { name: "burst", max: 5, windowMs: 10 * 60_000 },
  { name: "daily", max: 20, windowMs: 24 * 60 * 60_000 },
] as const;

export function rateLimit(ip: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSec: number } {
  if (buckets.size > 5_000) prune(now);
  for (const limit of RATE_LIMITS) {
    const key = `${limit.name}:${ip}`;
    const w = buckets.get(key);
    if (!w || w.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + limit.windowMs });
      continue;
    }
    if (w.count >= limit.max) return { ok: false, retryAfterSec: Math.ceil((w.resetAt - now) / 1000) };
    w.count++;
  }
  return { ok: true };
}

function prune(now: number) {
  for (const [k, w] of buckets) if (w.resetAt <= now) buckets.delete(k);
  for (const [k, r] of recent) if (now - r.at > DUPLICATE_WINDOW_MS) recent.delete(k);
}

export const DUPLICATE_WINDOW_MS = 15 * 60_000;

export function fingerprint(parts: string[]): string {
  return createHash("sha256").update(parts.join("␟")).digest("hex").slice(0, 32);
}

/** Returns the reference of an identical submission accepted recently, if any. */
export function findDuplicate(fp: string, now = Date.now()): string | null {
  const hit = recent.get(fp);
  if (hit && now - hit.at < DUPLICATE_WINDOW_MS) return hit.reference;
  return null;
}

export function rememberSubmission(fp: string, reference: string, now = Date.now()) {
  recent.set(fp, { at: now, reference });
}

/** Accept same-origin browser posts only. Requests without an Origin header (non-browser) are rejected. */
export function isAllowedOrigin(origin: string | null, host: string | null, allowed: string[]): boolean {
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  if (host && originHost === host) return true;
  return allowed.some((a) => {
    try {
      return new URL(a).host === originHost;
    } catch {
      return false;
    }
  });
}

export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return headers.get("x-real-ip") || "unknown";
}

export function newReference(): string {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `GLSC-${ymd}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

export function resetGuardsForTests() {
  buckets.clear();
  recent.clear();
}

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured: other guards still apply.
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
