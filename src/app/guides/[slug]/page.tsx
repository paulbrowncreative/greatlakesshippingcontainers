import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { guides, getGuide, type Block } from "@/content/guides";
import { absoluteUrl } from "@/content/site";
import { orgId, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return pageMetadata({ title: g.metaTitle, description: g.description, path: `/guides/${g.slug}`, image: g.image, type: "article" });
}

function render(b: Block, i: number) {
  switch (b.type) {
    case "p":
      return <p key={i}>{b.text}</p>;
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={i} className="table-wrap" role="region" aria-label="Comparison table" tabIndex={0}>
          <table>
            <thead>
              <tr>
                {b.head.map((h, j) => (
                  <th key={j} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join("|")}>
                  {r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "link":
      return (
        <p key={i}>
          <Link className="text-link" href={b.href}>
            {b.text}
          </Link>
        </p>
      );
  }
}

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const date = new Date(`${g.updated}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  return (
    <>
      <PageHero
        eyebrow={`Guide · ${g.readMinutes} min read`}
        title={g.title}
        lede={g.description}
        crumbs={[
          { name: "Guides", path: "/guides" },
          { name: g.title, path },
        ]}
      />
      <article className="section section--white">
        <div className="container split split--wide-left split--top">
          <div className="prose">
            <p className="muted small">
              Updated <time dateTime={g.updated}>{date}</time>
            </p>
            <figure className="media media--3x2">
              <Image src={g.image.src} alt={g.image.alt} fill sizes="(min-width: 60rem) 55vw, 100vw" priority />
              <figcaption>Illustrative photo</figcaption>
            </figure>
            {g.body.map(render)}
          </div>
          <aside className="stack" aria-label="Related" style={{ position: "sticky", top: "calc(var(--header-h) + 1.5rem)" }}>
            <div className="callout">
              <h2 style={{ fontSize: "var(--fs-h4)" }}>Related</h2>
              <ul className="footer-list mt-3" role="list">
                {g.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>{r.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="callout callout--warn">
              <h2 style={{ fontSize: "var(--fs-h4)" }}>Ready for a price?</h2>
              <p>Tell us size, ZIP code and timing. We&apos;ll reply with a delivered quote.</p>
              <p className="mt-4">
                <Link href="/quote" className="btn btn--sm">
                  Request a Quote
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </article>
      <CtaBand location={`guide_${g.slug}`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          image: absoluteUrl(g.image.src),
          datePublished: g.published,
          dateModified: g.updated,
          author: { "@id": orgId, "@type": "Organization", name: "Great Lakes Shipping Containers" },
          publisher: { "@id": orgId },
          mainEntityOfPage: absoluteUrl(path),
        }}
      />
    </>
  );
}
