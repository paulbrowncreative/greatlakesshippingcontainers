"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IconCheckCircle, IconInfo } from "./Icons";

/** Confirms success only when arriving from an accepted submission (valid reference in the URL). */
export function ThankYouReference() {
  const ref = useSearchParams().get("ref") ?? "";
  if (!/^GLSC-\d{8}-[A-Z0-9]{6}$/.test(ref)) {
    return (
      <div className="alert alert--info">
        <IconInfo />
        <div>
          <strong>Looking to send a request?</strong>
          <p>
            Use the <Link href="/quote">quote form</Link> or <Link href="/contact">contact form</Link>.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="alert alert--success" role="status">
      <IconCheckCircle />
      <div>
        <strong>Your request was sent.</strong>
        <p>Reference: {ref}. Mention it if you follow up with us.</p>
      </div>
    </div>
  );
}
