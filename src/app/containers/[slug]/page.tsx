import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContainerCard } from "@/components/ContainerCard";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { IconArrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { SpecPlate } from "@/components/SpecPlate";
import { TrackedLink } from "@/components/TrackedLink";
import { containers, getContainer } from "@/content/containers";
import { pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return containers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getContainer((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/containers/${c.slug}`, image: c.image });
}

const sizeParam: Record<string, string> = {
  "20-ft-shipping-containers": "20-standard",
  "40-ft-shipping-containers": "40-standard",
  "40-ft-high-cube-containers": "40-high-cube",
};

export default async function ContainerPage({ params }: Props) {
  const c = getContainer((await params).slug);
  if (!c) notFound();
  const quoteHref = `/quote?size=${sizeParam[c.slug]}`;
  const related = c.related.map(getContainer).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <PageHero
        eyebrow={`${c.badge.replace("HC", " HC")} · ${c.heightLabel}`}
        title={c.h1}
        lede={c.lede}
        crumbs={[
          { name: "Containers", path: "/containers" },
          { name: c.shortName, path: `/containers/${c.slug}` },
        ]}
      >
        <TrackedLink href={quoteHref} className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "product_hero", size: c.slug }}>
          Quote a {c.shortName} <IconArrow />
        </TrackedLink>
        <Link href="#specs" className="btn btn--lg btn--light">
          View Specs
        </Link>
      </PageHero>

      <section className="section" id="specs" aria-label="Specifications">
        <div className="container split split--top">
          <div className="stack">
            <Photo image={c.image} aspect="4x3" sizes="(min-width: 60rem) 45vw, 100vw" priority companyCaption="Example unit — the exact unit is confirmed on your quote" />
            <div className="callout">
              <h2 style={{ fontSize: "var(--fs-h4)" }}>Pricing &amp; availability</h2>
              <p>
                Container prices move with supply, condition grade and delivery distance, so we quote each order individually. Your
                quote names the condition grade and includes delivery to your ZIP code.
              </p>
              <p className="mt-3">
                <Link href={quoteHref} className="text-link">
                  Request a delivered price
                </Link>
              </p>
            </div>
          </div>
          <SpecPlate c={c} />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="best-for">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Best for</p>
            <h2 id="best-for">Where a {c.shortName} earns its keep</h2>
          </div>
          <div className="grid grid--4">
            {c.bestFor.map((b, i) => (
              <div key={b.title} className="value">
                <span className="value__num">0{i + 1}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="before-you-order">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Before you order</p>
            <h2 id="before-you-order">Site &amp; delivery considerations</h2>
            <p className="lede mt-4">
              What to check before a {c.shortName.toLowerCase()} arrives. We&apos;ll confirm anything you&apos;re unsure about when we
              quote.
            </p>
            <p className="mt-5">
              <Link href="/services/delivery" className="text-link">
                Full delivery checklist
              </Link>
            </p>
          </div>
          <ul className="checklist">
            {c.considerations.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="product-faq">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="product-faq">{c.shortName} FAQ</h2>
          </div>
          <Faq items={c.faqs} />
        </div>
      </section>

      <section className="section" aria-labelledby="related-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Compare</p>
            <h2 id="related-heading">Also consider</h2>
          </div>
          <div className="grid grid--3">
            {related.map((r) => (
              <ContainerCard key={r.slug} c={r} />
            ))}
            <div className="card" style={{ display: "grid", alignContent: "center", gap: "var(--space-3)" }}>
              <h3>New or used?</h3>
              <p>One-trip, cargo-worthy and wind &amp; water tight units differ in price, appearance and what they&apos;re fit for.</p>
              <Link href="/containers/condition-grades" className="text-link">
                Compare condition grades
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        location={`product_${c.slug}`}
        title={`Get a delivered price on a ${c.shortName}`}
        body="Tell us how many, your ZIP code and when you need it. We'll confirm the unit's grade and your site access, then send one price in writing."
        ctaLabel="Request a Quote"
        ctaHref={quoteHref}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...serviceSchema({ name: `${c.name} sales and delivery`, description: c.metaDescription, path: `/containers/${c.slug}`, serviceType: "Shipping container sales" }),
        }}
      />
    </>
  );
}
