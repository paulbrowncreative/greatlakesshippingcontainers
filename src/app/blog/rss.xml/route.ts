import { business } from "@/content/business";
import { postsNewestFirst } from "@/content/blog";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = postsNewestFirst()
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${p.published}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(business.name)} Blog</title><link>${absoluteUrl("/blog")}</link><atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/><description>Guides to buying, renting and placing shipping containers in ${business.state}.</description><language>en-us</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
