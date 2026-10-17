import { expect, test } from "@playwright/test";

const paths = ["/", "/containers", "/services/container-rentals", "/containers/40-ft-high-cube-containers", "/containers/condition-grades", "/services/container-sales", "/services/delivery", "/uses", "/service-area", "/guides", "/guides/preparing-your-site-for-container-delivery", "/about", "/contact", "/quote", "/privacy"];

for (const width of [320, 360, 414, 768]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 860 });
    for (const path of paths) {
      await page.goto(path);
      // Mobile emulation widens the layout viewport to fit overflowing content, so compare every
      // element against the real screen width, skipping content inside intentional scroll areas.
      const offenders = await page.evaluate((vw) => {
        const scrolls = (el: Element | null): boolean => {
          for (let n = el?.parentElement; n && n !== document.body; n = n.parentElement) {
            const ox = getComputedStyle(n).overflowX;
            if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") return true;
          }
          return false;
        };
        return [...document.querySelectorAll("body *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > vw + 1 && getComputedStyle(el).position !== "fixed" && !scrolls(el);
          })
          .slice(0, 3)
          .map((el) => `${el.tagName.toLowerCase()}.${el.className} → ${Math.round(el.getBoundingClientRect().right)}px`);
      }, width);
      expect(offenders, `${path} @ ${width}`).toEqual([]);
    }
  });
}

test("mobile menu opens, traps focus, closes with Escape and navigates", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu" });
  await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
  await toggle.click();
  const drawer = page.getByRole("navigation", { name: "Mobile" });
  await expect(drawer).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await page.getByRole("button", { name: "Menu" }).click();
  await drawer.getByRole("link", { name: "Delivery & Placement" }).click();
  await expect(page).toHaveURL(/\/services\/delivery$/);
  await expect(drawer).toBeHidden();
});

test("sticky quote bar appears after scrolling and is hidden on the quote page", async ({ page }) => {
  await page.goto("/containers/20-ft-shipping-containers");
  const bar = page.locator(".mobile-cta");
  await expect(bar).toHaveAttribute("data-visible", "false");
  await page.mouse.wheel(0, 1500);
  await expect(bar).toHaveAttribute("data-visible", "true");
  await bar.getByRole("link", { name: "Get a Quote" }).click();
  await expect(page).toHaveURL(/\/quote$/);
  await expect(page.locator(".mobile-cta")).toHaveCount(0);
});

test("tap targets in the header and form meet 44px", async ({ page }) => {
  await page.goto("/quote");
  for (const loc of [page.getByRole("button", { name: "Menu" }), page.getByRole("button", { name: "Continue" }), page.getByLabel("20 ft standard")]) {
    const box = await loc.evaluate((el) => (el.closest("label") ?? el).getBoundingClientRect().toJSON());
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});
