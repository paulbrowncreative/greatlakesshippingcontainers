"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & { event: TrackEvent; eventParams?: Record<string, unknown> };

/** A Next Link (or plain anchor for tel:/mailto:) that records a GA4 event on click. */
export function TrackedLink({ event, eventParams, onClick, href, ...rest }: Props) {
  const handle: ComponentProps<"a">["onClick"] = (e) => {
    track(event, eventParams);
    onClick?.(e);
  };
  if (typeof href === "string" && /^(tel|mailto):/.test(href)) {
    const { className, children, "aria-label": ariaLabel } = rest;
    return (
      <a href={href} onClick={handle} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return <Link href={href} onClick={handle} {...rest} />;
}
