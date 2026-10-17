import { expect, test } from "@playwright/test";

test("blog index lists every post once, with working topic links", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.locator("h1")).toHaveText(/Shipping container guides/i);
  const hrefs = await page.locator("main article h3 a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs.length).toBe(10);
  expect(new Set(hrefs).size).toBe(hrefs.length);
  await page.getByRole("navigation", { name: "Blog topics" }).getByRole("link").first().click();
  await expect(page).toHaveURL(/\/blog#/);
});

test("blog post: table of contents, structured data, inline links and CTA", async ({ page }) => {
  await page.goto("/blog/shipping-container-cost");
  const toc = page.getByRole("navigation", { name: "In this article" });
  await toc.getByRole("link", { name: "How to compare two quotes fairly" }).click();
  await expect(page).toHaveURL(/#how-to-compare-two-quotes-fairly$/);
  await expect(page.locator("#how-to-compare-two-quotes-fairly")).toBeInViewport();

  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t));
  const article = ld.find((d) => d["@type"] === "BlogPosting");
  expect(article.headline).toContain("shipping container cost");
  expect(article.keywords).toContain("shipping container cost");
  expect(article.wordCount).toBeGreaterThan(400);
  expect(ld.some((d) => d["@type"] === "BreadcrumbList")).toBe(true);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");

  await page.locator("main .post-body").getByRole("link", { name: "condition grade guide" }).click();
  await expect(page).toHaveURL(/\/containers\/condition-grades$/);
  await expect(page.getByRole("heading", { name: "Related reading" })).toBeVisible();
});

test("RSS feed is valid and lists all posts", async ({ request }) => {
  const res = await request.get("/blog/rss.xml");
  expect(res.headers()["content-type"]).toContain("application/rss+xml");
  const xml = await res.text();
  expect(xml.startsWith('<?xml version="1.0"')).toBe(true);
  expect((xml.match(/<item>/g) || []).length).toBe(10);
  expect(xml).toContain("<link>https://glsc-mi.com/blog/shipping-container-cost</link>");
});

test("old /guides URLs redirect permanently to the blog", async ({ request }) => {
  for (const [from, to] of [
    ["/guides", "/blog"],
    ["/guides/new-vs-used-shipping-containers", "/blog/new-vs-used-shipping-containers"],
  ]) {
    const r = await request.get(from, { maxRedirects: 0 });
    expect(r.status(), from).toBe(308);
    expect(r.headers()["location"]).toBe(to);
  }
});

test("homepage features the latest posts", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Know before you buy" }) });
  await expect(section.locator("article")).toHaveCount(3);
});
