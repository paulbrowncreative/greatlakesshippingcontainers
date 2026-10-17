import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { getPost, posts, postText, type Block } from "@/content/blog";
import { siteUrl } from "@/content/site";

const routes = new Set(sitemap().map((e) => e.url.replace(siteUrl, "") || "/"));
// Pages intentionally outside the sitemap but valid link targets.
["/quote", "/thank-you", "/photo-credits", "/blog/rss.xml"].forEach((r) => routes.add(r));

const inlineLinks = (b: Block): string[] => {
  const texts = b.type === "ul" || b.type === "ol" ? b.items : b.type === "p" || b.type === "callout" ? [b.text] : [];
  const fromText = texts.flatMap((t) => [...t.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]));
  return b.type === "cta" ? [...fromText, b.href] : fromText;
};

describe("blog content", () => {
  it("has unique slugs and primary keywords", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    expect(new Set(posts.map((p) => p.primaryKeyword.toLowerCase())).size).toBe(posts.length);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: metadata fits search snippets", (_, p) => {
    expect(p.metaTitle.length).toBeLessThanOrEqual(65);
    expect(p.description.length).toBeGreaterThanOrEqual(110);
    expect(p.description.length).toBeLessThanOrEqual(160);
    expect(p.published <= p.updated).toBe(true);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: mentions its primary keyword naturally", (_, p) => {
    const hay = `${p.title} ${p.description} ${postText(p)}`.toLowerCase();
    // Every significant word of the keyword appears in the article.
    for (const w of p.primaryKeyword.toLowerCase().split(/\s+/).filter((w) => w.length > 2)) expect(hay).toContain(w.replace(/ft$/, ""));
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: every internal link points at a real page", (_, p) => {
    const links = p.body.flatMap(inlineLinks).filter((h) => h.startsWith("/"));
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const href of links) expect(routes, href).toContain(href.split("#")[0]);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s: supports and related references resolve", (_, p) => {
    for (const path of p.supports) expect(routes, path).toContain(path);
    for (const slug of p.related) expect(getPost(slug), slug).toBeTruthy();
    expect(p.related).not.toContain(p.slug);
  });

  it("every h2 in a post is unique (table of contents anchors)", () => {
    for (const p of posts) {
      const h2 = p.body.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
      expect(new Set(h2).size, p.slug).toBe(h2.length);
    }
  });
});
