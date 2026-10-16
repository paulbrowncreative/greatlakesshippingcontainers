"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

export const turnstileEnabled = Boolean(SITE_KEY);

/** Cloudflare Turnstile widget. Renders nothing when no site key is configured. */
export function Turnstile({ onToken, resetSignal }: { onToken: (token: string) => void; resetSignal: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const cb = useRef(onToken);
  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);

  const mount = () => {
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (!api || !ref.current || widgetId.current) return;
    widgetId.current = api.render(ref.current, {
      sitekey: SITE_KEY,
      theme: "light",
      callback: (t: string) => cb.current(t),
      "expired-callback": () => cb.current(""),
      "error-callback": () => cb.current(""),
    });
  };

  useEffect(() => {
    mount();
    return () => {
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (api && widgetId.current) api.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  useEffect(() => {
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (resetSignal && api && widgetId.current) api.reset(widgetId.current);
  }, [resetSignal]);

  if (!SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={mount} />
      <div ref={ref} />
    </>
  );
}
