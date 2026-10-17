import Image from "next/image";
import Link from "next/link";
import { categories, readingMinutes, type BlogPost } from "@/content/blog";

export function PostCard({ post, headingLevel = 3 }: { post: BlogPost; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className="unit-card post-card">
      <div className="unit-card__media">
        <Image src={post.image.src} alt="" fill sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw" />
      </div>
      <div className="unit-card__body">
        <p className="post-card__meta">
          <span>{categories[post.category].label}</span> · {readingMinutes(post)} min read
        </p>
        <H>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </H>
        <p className="muted small">{post.excerpt}</p>
      </div>
    </article>
  );
}
