import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Container Buying Guides | Sizes, Grades & Delivery",
  description: "Practical guides to buying a shipping container: choosing a size, new vs used grades, and preparing your site for delivery.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Container buying guides"
        lede="Plain-English answers to the questions buyers ask most — so you can compare quotes like for like and be ready on delivery day."
        crumbs={[{ name: "Guides", path: "/guides" }]}
      />
      <section className="section">
        <div className="container grid grid--3">
          {guides.map((g) => (
            <article key={g.slug} className="unit-card">
              <div className="unit-card__media">
                <Image src={g.image.src} alt="" fill sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw" />
              </div>
              <div className="unit-card__body">
                <p className="muted small">{g.readMinutes} min read</p>
                <h2 style={{ fontSize: "var(--fs-h4)", textTransform: "none" }}>
                  <Link href={`/guides/${g.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {g.title}
                  </Link>
                </h2>
                <p className="muted small">{g.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand location="guides_footer" />
    </>
  );
}
