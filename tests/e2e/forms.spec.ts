import { expect, test } from "@playwright/test";

const sent = async (request: import("@playwright/test").APIRequestContext) =>
  (await (await request.get("http://localhost:3999/__sent")).json()) as { body: Record<string, unknown> }[];

test.describe.configure({ mode: "serial" });

test("quote form validates each step and submits end-to-end to the email provider", async ({ page, request }) => {
  const before = (await sent(request)).length;
  await page.goto("/quote");
  // Step 1: nothing selected for size → error.
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Choose a size, or pick “Not sure”.")).toBeVisible();
  await page.getByLabel("40 ft standard").check();
  await page.getByLabel("How many?").fill("2");
  await page.getByLabel("Condition").selectOption("wind-water-tight");
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 2: invalid ZIP.
  await expect(page.getByRole("heading", { name: "Where is it going?" })).toBeFocused();
  await page.getByLabel("Delivery ZIP code").fill("482");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter the 5-digit ZIP code")).toBeVisible();
  await expect(page.getByLabel("Delivery ZIP code")).toBeFocused();
  await expect(page.getByLabel("Delivery ZIP code")).toHaveAttribute("aria-invalid", "true");
  await page.getByLabel("Delivery ZIP code").fill("48226");
  await page.getByLabel("When do you need it?").selectOption("2-weeks");
  await page.getByLabel(/What will it sit on/).selectOption("gravel");
  await page.getByLabel(/site access/).fill("Gate is 14 ft wide. Low branches on the east side.");
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 3: contact.
  await page.getByRole("button", { name: "Review Request" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Please confirm we can contact you")).toBeVisible();
  await page.getByLabel("Full name").fill("Jordan Tester");
  await page.getByRole("textbox", { name: /Company/ }).fill("Tester Builders");
  await page.getByRole("textbox", { name: "Email" }).fill("jordan@example.com");
  await page.getByRole("textbox", { name: /^Phone/ }).fill("(313) 555-0199");
  await page.getByLabel(/may contact me/).check();
  await page.getByRole("button", { name: "Review Request" }).click();

  // Step 4: review summary, edit, submit.
  await expect(page.getByRole("heading", { name: "Review your request", exact: true })).toBeVisible();
  const summary = page.getByLabel("Your request", { exact: true });
  await expect(summary).toContainText("40 ft standard");
  await expect(summary).toContainText("48226");
  await expect(summary).toContainText("Tester Builders");
  await page.getByRole("button", { name: "Edit container details" }).click();
  await page.getByLabel("How many?").fill("3");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Review Request" }).click();
  await expect(summary).toContainText("3");
  await page.waitForTimeout(3100); // minimum fill time guard
  await page.getByRole("button", { name: "Send Quote Request" }).click();

  await expect(page).toHaveURL(/\/thank-you\?ref=GLSC-\d{8}-[A-Z0-9]{6}&type=quote/);
  await expect(page.getByText("Your request was sent.")).toBeVisible();

  const emails = await sent(request);
  expect(emails.length).toBe(before + 1);
  const email = emails.at(-1)!.body;
  expect(email.to).toEqual(["chris@stierenterprise.com"]);
  expect(email.reply_to).toBe("jordan@example.com");
  expect(email.subject).toBe("New Website Inquiry — Great Lakes Shipping Containers | Buy: 3 × 40 ft standard · ZIP 48226");
  expect(String(email.text)).toContain("Placement surface: Compacted gravel");
  expect(String(email.text)).toContain("Gate is 14 ft wide");
  expect(String(email.text)).toContain("Submitted from: /quote");
});

test("provider failure shows an honest error and keeps the visitor’s details", async ({ page, request }) => {
  const before = (await sent(request)).length;
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Casey Failure");
  await page.getByRole("textbox", { name: "Email" }).fill("casey@example.com");
  await page.getByLabel("How can we help?").fill("Testing SIMULATE_PROVIDER_FAILURE handling please.");
  await page.getByLabel(/may contact me/).check();
  await page.waitForTimeout(3100); // minimum fill time guard
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator(".alert--error[role=alert]")).toContainText("Your request wasn’t sent");
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByLabel("Full name")).toHaveValue("Casey Failure");
  await expect(page.getByLabel("How can we help?")).toHaveValue(/SIMULATE_PROVIDER_FAILURE/);
  expect((await sent(request)).length).toBe(before);
});

test("contact form submits a general question", async ({ page, request }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Tell us a little about what you need")).toBeVisible();
  await page.getByLabel("Full name").fill("Riley Question");
  await page.getByRole("textbox", { name: "Email" }).fill("riley@example.com");
  await page.getByLabel("How can we help?").fill("Do you sell 45 ft containers for a farm in Ionia County?");
  await page.getByLabel(/may contact me/).check();
  await page.waitForTimeout(3100);
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page).toHaveURL(/\/thank-you\?ref=/);
  const email = (await sent(request)).at(-1)!.body;
  expect(email.subject).toBe("New Website Inquiry — Great Lakes Shipping Containers | Question from Riley Question");
  expect(email.to).toEqual(["chris@stierenterprise.com"]);
});

test("thank-you page without a reference does not claim success", async ({ page }) => {
  await page.goto("/thank-you");
  await expect(page.getByText("Your request was sent.")).toHaveCount(0);
  await expect(page.getByText("Looking to send a request?")).toBeVisible();
});
