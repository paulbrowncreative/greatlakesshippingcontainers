import Link from "next/link";
import { postsSupporting } from "@/content/blog";

/** "Related reading" links from a service/product page to the blog posts that support it. */
export function RelatedReading({ path, title = "Related reading" }: { path: string; title?: string }) {
  const list = postsSupporting(path);
  if (!list.length) return null;
  return (
    <section className="section section--tight" aria-labelledby="related-reading">
      <div className="container">
        <p className="eyebrow">From the blog</p>
        <h2 id="related-reading" style={{ fontSize: "var(--fs-h3)" }}>
          {title}
        </h2>
        <ul className="related-reading mt-5" role="list">
          {list.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`}>
                <strong>{p.title}</strong>
                <span>{p.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
