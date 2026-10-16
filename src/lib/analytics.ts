/**
 * Thin wrapper around GA4's gtag. No-ops unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 * and the GA script has loaded. Event names follow GA4 recommended events where one exists.
 */
type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;

export type TrackEvent =
  | "generate_lead" // successful inquiry accepted by the email provider
  | "form_start"
  | "form_error"
  | "quote_cta_click"
  | "phone_click"
  | "email_click"
  | "container_chooser_result";

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}
