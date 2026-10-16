import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure", launchOptions: { executablePath } },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } }, testIgnore: /mobile\.spec\.ts/ },
    { name: "mobile", use: { ...devices["Pixel 7"] }, testMatch: /mobile\.spec\.ts/ },
  ],
  webServer: [
    { command: "node tests/e2e/mock-resend.mjs", port: 3999, reuseExistingServer: false },
    {
      command: `npx next start -p ${PORT}`,
      port: PORT,
      reuseExistingServer: false,
      env: {
        RESEND_API_KEY: "re_e2e_test",
        RESEND_API_URL: "http://localhost:3999",
        INQUIRY_FROM_EMAIL: "Great Lakes Shipping Containers <quotes@glsc-mi.com>",
        NEXT_PUBLIC_SITE_URL: "https://glsc-mi.com",
      },
    },
  ],
});
