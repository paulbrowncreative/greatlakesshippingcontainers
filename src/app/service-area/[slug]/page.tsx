import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { serviceAreas } from "@/content/service-areas";
import { pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

const find = (slug: string) => serviceAreas.find((a) => a.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = find((await params).slug);
  return a ? pageMetadata({ title: a.metaTitle, description: a.metaDescription, path: `/service-area/${a.slug}` }) : {};
}

export default async function AreaPage({ params }: Props) {
  const a = find((await params).slug);
  if (!a) notFound();
  const path = `/service-area/${a.slug}`;
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title={`Shipping containers in ${a.name}`}
        lede={a.intro}
        crumbs={[
          { name: "Service Area", path: "/service-area" },
          { name: a.name, path },
        ]}
      >
        <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: `area_${a.slug}` }}>
          Get a {a.name} Quote
        </TrackedLink>
      </PageHero>
      <section className="section section--white">
        <div className="container grid grid--3">
          {a.localNotes.map((n) => (
            <div key={n.title} className="card">
              <h2 style={{ fontSize: "var(--fs-h4)", textTransform: "none" }}>{n.title}</h2>
              <p>{n.body}</p>
            </div>
          ))}
        </div>
      </section>
      {a.communities.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>Communities we deliver to</h2>
            <ul className="chips mt-5" role="list">
              {a.communities.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link className="text-link" href="/services/delivery">
                Delivery requirements
              </Link>
            </p>
          </div>
        </section>
      )}
      <CtaBand location={`area_${a.slug}_footer`} />
      <JsonLd data={{ "@context": "https://schema.org", ...serviceSchema({ name: `Shipping container sales and delivery — ${a.name}`, description: a.metaDescription, path, serviceType: "Shipping container sales" }) }} />
    </>
  );
}
