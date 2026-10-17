import Link from "next/link";
import { Suspense } from "react";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { QuoteFormFromQuery } from "@/components/QuoteFormFromQuery";
import { business, phoneHref } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Shipping Container Quote | Delivered Pricing in Michigan",
  description:
    "Request a delivered quote for a 20 ft, 40 ft or high cube shipping container in Michigan. Takes about two minutes — no technical knowledge needed.",
  path: "/quote",
});

export default function QuotePage() {
  const tel = phoneHref();
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Get a delivered price"
        lede="Answer a few questions about the container and your site. We’ll reply by email with the right unit, its condition grade and one price including delivery."
        crumbs={[{ name: "Request a Quote", path: "/quote" }]}
      />
      <section className="section section--tight">
        <div className="container split split--form split--top">
          <div>
            <noscript>
              <div className="alert alert--info">
                <div>
                  <strong>This form needs JavaScript.</strong>
                  <p>Please enable JavaScript{business.phone ? `, call ${business.phone},` : ""} or message us on Facebook.</p>
                </div>
              </div>
            </noscript>
            <Suspense fallback={<InquiryForm mode="quote" />}>
              <QuoteFormFromQuery />
            </Suspense>
          </div>
          <aside className="stack" aria-label="What to expect">
            <h2 style={{ fontSize: "var(--fs-h3)" }}>What happens next</h2>
            <ol className="steps" role="list">
              <li className="step">
                <h3>We review your request</h3>
                <p>And check the right unit and route to your ZIP code.</p>
              </li>
              <li className="step">
                <h3>We follow up</h3>
                <p>By email — or a quick call if we need to ask about site access.</p>
              </li>
              <li className="step">
                <h3>You get one price</h3>
                <p>Container, grade and delivery, in writing. No obligation.</p>
              </li>
            </ol>
            <div className="callout">
              <h3>Prefer to talk?</h3>
              <p>
                {tel ? (
                  <>
                    Call <a href={tel}>{business.phone}</a>, or message us on{" "}
                  </>
                ) : (
                  <>Message us on </>
                )}
                <a href={business.social.facebook} target="_blank" rel="noopener">
                  Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
                . Have a general question instead? Use the <Link href="/contact">contact form</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
