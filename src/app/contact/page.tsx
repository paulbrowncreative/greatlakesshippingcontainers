import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { IconFacebook, IconMail, IconPhone, IconPin } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { business, phoneHref } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Great Lakes Shipping Containers",
  description: "Questions about shipping container sizes, condition grades or delivery in Michigan? Send us a message and we’ll reply by email.",
  path: "/contact",
});

export default function ContactPage() {
  const tel = phoneHref();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask us anything"
        lede="Questions about sizes, grades, delivery or your site — send a message and we’ll reply by email. Ready for pricing? The quote form is faster."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      >
        <Link href="/quote" className="btn btn--lg">
          Request a Quote Instead
        </Link>
      </PageHero>
      <section className="section section--tight">
        <div className="container split split--form split--top">
          <div>
            <noscript>
              <div className="alert alert--info">
                <div>
                  <strong>This form needs JavaScript.</strong>
                  <p>
                    Please enable JavaScript{business.phone ? `, call ${business.phone},` : ""} or message us on Facebook.
                  </p>
                </div>
              </div>
            </noscript>
            <InquiryForm mode="contact" />
          </div>
          <aside className="stack" aria-label="Other ways to reach us">
            <h2 style={{ fontSize: "var(--fs-h3)" }}>Other ways to reach us</h2>
            <ul className="footer-list" role="list" style={{ gap: "var(--space-3)" }}>
              {tel && (
                <li className="cluster">
                  <IconPhone width={20} /> <a href={tel}>{business.phone}</a>
                </li>
              )}
              {business.publicEmail && (
                <li className="cluster">
                  <IconMail width={20} /> <a href={`mailto:${business.publicEmail}`}>{business.publicEmail}</a>
                </li>
              )}
              {business.address && (
                <li className="cluster">
                  <IconPin width={20} />
                  <address style={{ fontStyle: "normal" }}>
                    {business.address.street}, {business.address.city}, {business.address.region} {business.address.postalCode}
                  </address>
                </li>
              )}
              <li className="cluster">
                <IconFacebook width={20} />
                <a href={business.social.facebook} target="_blank" rel="noopener">
                  Message us on Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
            {business.hours && <p className="muted">{business.hours}</p>}
            <div className="callout">
              <h3>Looking for a price?</h3>
              <p>
                The <Link href="/quote">quote form</Link> asks for size, ZIP code and timing so we can reply with a delivered price —
                no back-and-forth.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
