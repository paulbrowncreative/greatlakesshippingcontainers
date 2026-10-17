import { expect, test, type Page } from "@playwright/test";

async function sitemapPaths(page: Page): Promise<string[]> {
  const res = await page.request.get("/sitemap.xml");
  expect(res.ok()).toBeTruthy();
  const xml = await res.text();
  return [...xml.matchAll(/<loc>https:\/\/glsc-mi\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
}

test("every sitemap page renders with unique title, canonical, one H1 and valid JSON-LD", async ({ page }) => {
  const paths = await sitemapPaths(page);
  expect(paths.length).toBeGreaterThanOrEqual(19);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of paths) {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    const title = await page.title();
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(title.length, `${path} title length`).toBeLessThanOrEqual(70);
    expect(desc && desc.length >= 50 && desc.length <= 160, `${path} description length ${desc?.length}`).toBeTruthy();
    expect(canonical, path).toBe(`https://glsc-mi.com${path === "/" ? "" : path}`);
    expect(titles.has(title), `duplicate title ${title}`).toBeFalsy();
    expect(descriptions.has(desc!), `duplicate description on ${path}`).toBeFalsy();
    titles.add(title);
    descriptions.add(desc!);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /^https:\/\/glsc-mi\.com\//);
    for (const ld of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(ld), `${path} JSON-LD`).not.toThrow();
    }
    // Heading levels must not skip (e.g. h1 -> h3).
    const levels = await page.locator("main h1, main h2, main h3, main h4").evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
    for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `${path} heading skip`).toBeLessThanOrEqual(1);
    // Every image has an alt attribute (empty is allowed for decorative images).
    expect(await page.locator("img:not([alt])").count(), `${path} images without alt`).toBe(0);
    expect(errors, path).toEqual([]);
  }
});

test("all internal links resolve", async ({ page, request }) => {
  const paths = await sitemapPaths(page);
  const links = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    for (const href of await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) {
      if (href.startsWith("/") && !href.startsWith("//")) links.add(href.split("#")[0] || "/");
    }
  }
  for (const href of links) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test("robots, sitemap, redirects and 404", async ({ page, request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://glsc-mi.com/sitemap.xml");
  expect(robots).toContain("Disallow: /api/");
  const r = await request.get("/contact-us", { maxRedirects: 0 });
  expect(r.status()).toBe(308);
  expect(r.headers()["location"]).toBe("/contact");
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("This page isn’t here");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("security headers are set and the API rejects foreign origins", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-powered-by"]).toBeUndefined();
  const api = await request.post("/api/inquiry", { data: {}, headers: { origin: "https://evil.example" } });
  expect(api.status()).toBe(403);
  const get = await request.get("/api/inquiry");
  expect(get.status()).toBe(405);
});

test("desktop dropdown is keyboard operable", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Containers" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const link = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: /40 ft High Cube/ });
  await expect(link).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await link.click();
  await expect(page).toHaveURL(/\/containers\/40-ft-high-cube-containers$/);
  await expect(page.locator("h1")).toHaveText(/High Cube/i);
});

test("size chooser recommends a container and links to a pre-filled quote", async ({ page }) => {
  await page.goto("/containers");
  const chooser = page.locator("#size-chooser");
  await chooser.getByLabel("Tall equipment or machinery").check();
  await chooser.getByLabel("10–20 pallets’ worth").check();
  await chooser.getByLabel("Open — yard, farm or large lot").check();
  await expect(chooser.getByRole("heading", { name: "40 ft high cube" })).toBeVisible();
  await chooser.getByRole("link", { name: "Quote this size" }).click();
  await expect(page).toHaveURL(/\/quote\?size=40-high-cube/);
  await expect(page.getByLabel("40 ft high cube")).toBeChecked();
});

test("FAQ accordions toggle with the keyboard", async ({ page }) => {
  await page.goto("/");
  const summary = page.locator("summary", { hasText: "Do I need a permit?" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details", { has: summary })).toHaveAttribute("open", "");
});

test("rental CTA pre-selects a rental quote with a rental-length question", async ({ page }) => {
  await page.goto("/services/container-rentals");
  await page.getByRole("link", { name: "Get a Rental Quote" }).first().click();
  await expect(page).toHaveURL(/\/quote\?type=rent/);
  await expect(page.getByLabel("Rent a container")).toBeChecked();
  await expect(page.getByLabel("How long do you need it?")).toBeVisible();
});

test("phone number is a working tap-to-call link", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('main a[href="tel:+15862657744"]').first()).toBeVisible();
});
