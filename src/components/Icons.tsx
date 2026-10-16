import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...p,
});

export const IconArrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconChevron = (p: P) => (
  <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconMenu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const IconAlert = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
);
export const IconCheckCircle = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
);
export const IconInfo = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
);
export const IconTruck = (p: P) => (
  <svg {...base(p)}><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" /><circle cx="6" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>
);
export const IconRuler = (p: P) => (
  <svg {...base(p)}><path d="m3 17 14-14 4 4L7 21z" /><path d="m7 13 2 2M10 10l2 2M13 7l2 2" /></svg>
);
export const IconShield = (p: P) => (
  <svg {...base(p)}><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconClipboard = (p: P) => (
  <svg {...base(p)}><rect x="5" y="4" width="14" height="17" rx="1" /><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" /></svg>
);
export const IconPin = (p: P) => (
  <svg {...base(p)}><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconFacebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
  </svg>
);

/** Brand mark: a container's door end (four lock rods) over a Great Lakes wave line. */
export function BrandMark(p: P) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden focusable={false} {...p}>
      <rect x="1.5" y="1.5" width="37" height="37" rx="3" fill="#b5441a" />
      <rect x="6" y="6" width="28" height="22" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M12 8.5v17M17.3 8.5v17M22.7 8.5v17M28 8.5v17" stroke="#fff" strokeWidth="1.8" />
      <path d="M10 13h4M15.3 20h4M20.7 13h4M26 20h4" stroke="#fff" strokeWidth="1.6" />
      <path d="M5 33.5c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0 5 2 7.5 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
