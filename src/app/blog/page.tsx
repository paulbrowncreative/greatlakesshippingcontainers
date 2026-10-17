import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { categories, postsNewestFirst, type CategoryId } from "@/content/blog";
import { absoluteUrl } from "@/content/site";
import { orgId, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Shipping Container Blog | Buying, Rental & Delivery Guides",
    description:
      "Practical guides to buying and renting shipping containers in Michigan: prices, sizes, condition grades, permits, frost laws, site prep and security.",
    path: "/blog",
  }),
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogIndex() {
  const all = postsNewestFirst();
  const latest = all.slice(0, 3);
  const rest = all.slice(3);
  const groups = (Object.keys(categories) as CategoryId[]).map((id) => ({ id, ...categories[id], posts: rest.filter((p) => p.category === id) }));
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Shipping container guides"
        lede="Straight answers to the questions buyers and renters ask most — so you can compare quotes like for like and be ready on delivery day."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="section" aria-labelledby="latest">
        <div className="container">
          <h2 id="latest" className="sr-only">
            Latest articles
          </h2>
          <div className="grid grid--3">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} headingLevel={3} />
            ))}
          </div>
          <nav aria-label="Blog topics" className="mt-6">
            <ul className="chips" role="list">
              {groups
                .filter((g) => g.posts.length)
                .map((g) => (
                  <li key={g.id}>
                    <a className="chip" href={`#${g.id}`} style={{ textDecoration: "none", minHeight: "2.75rem" }}>
                      {g.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
      {groups
        .filter((g) => g.posts.length)
        .map((g, i) => (
          <section key={g.id} id={g.id} className={`section section--tight${i % 2 ? "" : " section--white"}`} aria-labelledby={`${g.id}-h`}>
            <div className="container">
              <div className="section-head" style={{ marginBottom: "var(--space-6)" }}>
                <h2 id={`${g.id}-h`} style={{ fontSize: "var(--fs-h3)" }}>
                  {g.label}
                </h2>
                <p className="muted">{g.description}</p>
              </div>
              <div className="grid grid--3">
                {g.posts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        ))}
      <p className="container small muted" style={{ paddingBlock: "var(--space-5)" }}>
        Subscribe via <Link href="/blog/rss.xml">RSS</Link>.
      </p>
      <CtaBand location="blog_index" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Great Lakes Shipping Containers Blog",
          url: absoluteUrl("/blog"),
          publisher: { "@id": orgId },
          blogPost: all.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.published })),
        }}
      />
    </>
  );
}
