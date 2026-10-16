import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

/**
 * Native <details> accordions: keyboard and screen-reader accessible with no JS, and
 * answers stay in the HTML for crawlers. FAQPage schema is intentionally omitted —
 * Google limits FAQ rich results to authoritative government and health sites.
 */
export function Faq({ items, openFirst = false }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} open={openFirst && i === 0}>
          <summary>{item.q}</summary>
          <div className="faq__answer">{typeof item.a === "string" ? <p>{item.a}</p> : item.a}</div>
        </details>
      ))}
    </div>
  );
}
