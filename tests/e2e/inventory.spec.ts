import { expect, test } from "@playwright/test";

test("inventory lists units, filters by size and carries a unit into the quote form", async ({ page }) => {
  await page.goto("/inventory");
  await expect(page.getByRole("heading", { level: 1, name: "Containers available now" })).toBeVisible();
  const cards = page.locator(".stock-grid > li");
  const total = await cards.count();
  expect(total).toBeGreaterThanOrEqual(5);

  // Filter to 40 ft standard and back.
  await page.getByRole("button", { name: /^40 ft standard/ }).click();
  await expect(page).toHaveURL(/size=40-standard/);
  await expect(page.locator(".stock-grid > li:visible")).toHaveCount(1);
  await page.getByRole("button", { name: /^All sizes/ }).click();
  await expect(page.locator(".stock-grid > li:visible")).toHaveCount(total);

  // A filtered link from a product page applies on load.
  await page.goto("/inventory?size=40-high-cube");
  await expect(page.getByRole("button", { name: /^40 ft high cube/ })).toHaveAttribute("aria-pressed", "true");

  // Request a specific unit.
  await page.getByRole("link", { name: "Request This Container (GL-004)" }).click();
  await expect(page).toHaveURL(/\/quote\?unit=GL-004/);
  await expect(page.getByText("GL-004 · 40 ft high cube · Used Blue")).toBeVisible();
  await expect(page.getByLabel("40 ft high cube")).toBeChecked();

  // Picking a different size releases the unit.
  await page.getByLabel("20 ft standard").check();
  await expect(page.getByText("Requesting unit")).toHaveCount(0);
});

test("inventory is in the main navigation and linked from product pages", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.getByRole("navigation", { name: /main/i }).getByRole("link", { name: "Inventory" }).click();
  await expect(page).toHaveURL(/\/inventory$/);
  await page.goto("/containers/40-ft-high-cube-containers");
  await page.getByRole("link", { name: /See \d+ listed units?/ }).click();
  await expect(page).toHaveURL(/\/inventory\?size=40-high-cube/);
});
