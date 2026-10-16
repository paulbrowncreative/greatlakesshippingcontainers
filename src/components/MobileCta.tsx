"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, phoneHref } from "@/content/business";
import { IconPhone } from "./Icons";
import { TrackedLink } from "./TrackedLink";

/** Sticky bottom bar on small screens. Appears after the hero scrolls away; hidden on the quote page itself. */
export function MobileCta() {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);
  const hidden = pathname.startsWith("/quote") || pathname === "/contact";
  const tel = phoneHref();

  useEffect(() => {
    if (hidden) return;
    document.body.dataset.hasMobileCta = "true";
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete document.body.dataset.hasMobileCta;
    };
  }, [hidden]);

  if (hidden) return null;
  return (
    <div className="mobile-cta" data-visible={visible} aria-hidden={!visible} inert={!visible}>
      {tel && (
        <TrackedLink href={tel} className="btn btn--light" event="phone_click" eventParams={{ location: "sticky_bar" }}>
          <IconPhone /> Call
        </TrackedLink>
      )}
      <TrackedLink href="/quote" className="btn" event="quote_cta_click" eventParams={{ location: "sticky_bar" }}>
        Get a Quote
      </TrackedLink>
      <span className="sr-only">{business.name}</span>
    </div>
  );
}
