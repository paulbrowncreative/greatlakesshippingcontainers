import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("every sitemap page passes axe WCAG 2.2 A/AA checks", async ({ page }) => {
  const xml = await (await page.request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>https:\/\/glsc-mi\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
  const failures: string[] = [];
  for (const path of [...paths, "/thank-you", "/does-not-exist"]) {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    for (const v of violations) failures.push(`${path}: ${v.id} (${v.impact}) × ${v.nodes.length} — ${v.nodes[0]?.target.join(" ")}`);
  }
  expect(failures).toEqual([]);
});
