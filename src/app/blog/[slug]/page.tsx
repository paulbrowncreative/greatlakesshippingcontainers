import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody, tocFor } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { business, phoneHref } from "@/content/business";
import { categories, getPost, posts, readingMinutes, wordCount } from "@/content/blog";
import { absoluteUrl } from "@/content/site";
import { orgId, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const base = pageMetadata({ title: p.metaTitle, description: p.description, path: `/blog/${p.slug}`, image: p.image, type: "article" });
  return {
    ...base,
    keywords: [p.primaryKeyword, ...p.secondaryKeywords],
    openGraph: { ...base.openGraph, type: "article", publishedTime: p.published, modifiedTime: p.updated, section: categories[p.category].label },
  };
}

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const toc = tocFor(p.body);
  const related = p.related.map(getPost).filter((r): r is NonNullable<typeof r> => Boolean(r));
  const tel = phoneHref();
  return (
    <>
      <PageHero
        eyebrow={`${categories[p.category].label} · ${readingMinutes(p)} min read`}
        title={p.title}
        lede={p.excerpt}
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: p.title, path },
        ]}
      />
      <article className="section section--white">
        <div className="container post-layout">
          <div className="prose post-body">
            <p className="muted small">
              By {business.name} · Updated <time dateTime={p.updated}>{fmt(p.updated)}</time>
            </p>
            <Photo image={p.image} aspect="3x2" sizes="(min-width: 64rem) 46rem, 100vw" priority companyCaption="" />
            {toc.length > 2 && (
              <details className="toc-mobile">
                <summary>In this article</summary>
                <ol>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <PostBody body={p.body} />
          </div>
          <aside className="post-aside" aria-label="Article tools">
            {toc.length > 2 && (
              <nav className="toc toc--desktop" aria-label="In this article">
                <p className="toc__title">In this article</p>
                <ol role="list">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="callout callout--warn">
              <p className="callout__title">Ready for a price?</p>
              <p>Tell us the size, ZIP code and timing. We’ll reply with a delivered quote.</p>
              <p className="cluster mt-4">
                <Link href="/quote" className="btn btn--sm">
                  Get a Quote
                </Link>
                {tel && (
                  <a href={tel} className="text-link">
                    {business.phone}
                  </a>
                )}
              </p>
            </div>
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section" aria-labelledby="keep-reading">
          <div className="container">
            <h2 id="keep-reading" style={{ fontSize: "var(--fs-h3)" }}>
              Keep reading
            </h2>
            <div className="grid grid--3 mt-5">
              {related.map((r) => (
                <PostCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand location={`blog_${p.slug}`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(path)}#article`,
          headline: p.title,
          description: p.description,
          image: absoluteUrl(p.image.src),
          datePublished: p.published,
          dateModified: p.updated,
          wordCount: wordCount(p),
          articleSection: categories[p.category].label,
          keywords: [p.primaryKeyword, ...p.secondaryKeywords].join(", "),
          inLanguage: "en-US",
          author: { "@type": "Organization", "@id": orgId, name: business.name, url: absoluteUrl("/") },
          publisher: { "@id": orgId },
          mainEntityOfPage: absoluteUrl(path),
          isPartOf: { "@type": "Blog", "@id": `${absoluteUrl("/blog")}#blog`, name: "Great Lakes Shipping Containers Blog" },
        }}
      />
    </>
  );
}
