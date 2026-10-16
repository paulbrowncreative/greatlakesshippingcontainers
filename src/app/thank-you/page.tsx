import Link from "next/link";
import { ThankYouReference } from "@/components/ThankYouReference";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = pageMetadata({
  title: "Request Received | Great Lakes Shipping Containers",
  description: "Your request has been sent.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container container--narrow stack">
        <Suspense fallback={null}>
          <ThankYouReference />
        </Suspense>
        <h1 style={{ fontSize: "var(--fs-h2)" }}>Thank you</h1>
        <p className="lede">
          Requests sent through this site go straight to the {business.name} team. We reply to the email address you provide, and
          may call if we need to check anything about site access.
        </p>
        <h2 style={{ fontSize: "var(--fs-h4)", textTransform: "none" }} className="mt-6">
          While you wait
        </h2>
        <ul className="checklist">
          <li>
            Check your <Link href="/services/delivery">site against the delivery checklist</Link> — level ground, a straight approach
            and overhead clearance.
          </li>
          <li>
            Read up on <Link href="/containers/condition-grades">condition grades</Link> so you can compare quotes like for like.
          </li>
          <li>Call your city or township zoning office if you haven&apos;t confirmed local placement rules.</li>
        </ul>
        <p className="mt-6">
          <Link href="/" className="btn btn--secondary">
            Back to Home
          </Link>
        </p>
      </div>
    </section>
  );
}
