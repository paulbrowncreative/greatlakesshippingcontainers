# QA Report

Date: October 16, 2026. Build: Next.js 16.4.2, Node 22. Every result below was produced in the development container. Items marked **Not yet verified** require production credentials or a deployed environment.

## 1. Pages built (24 indexable URLs + utility pages)

Home · Containers hub · 20 ft · 40 ft · 40 ft High Cube · Condition Grades · Container Sales · Delivery & Placement · Uses · Service Area · Guides hub · 3 guides · About · Contact · Quote · Privacy · Terms. Utility (noindex): Thank-you · Photo Credits · 404. Data-driven route `/service-area/[slug]` is ready (no markets listed yet).

## 2. Features

- Multi-step quote form: container → delivery → contact → review, with conditional fields (question-only requests skip container and delivery steps; rental questions appear only if rentals are enabled), field-level validation, focus management, an editable review summary, a loading state, double-submit prevention, and honest error recovery that keeps the visitor's entries.
- Contact form (same backend). The old newsletter widget was removed because it had no real destination.
- Server-side pipeline: origin check → content-type → per-IP rate limit → size limit → honeypot → minimum fill time → validation and sanitization → link-spam check → optional Turnstile → duplicate fingerprint → Resend send with idempotency key → success **only** on a provider-confirmed id.
- Size chooser, sticky mobile quote bar, keyboard-operable dropdown navigation, focus-trapped mobile drawer, native `<details>` FAQs, compare table, data-plate spec panels.
- GA4 event plumbing (`generate_lead`, `quote_cta_click`, `phone_click`, `form_start`, `form_error`, `container_chooser_result`). It loads only when an ID is configured.

## 3. Automated test results

| Suite | Result |
|---|---|
| `tsc --noEmit` | Pass |
| ESLint (next/core-web-vitals + TS) | Pass, 0 warnings |
| Vitest unit tests | **38/38 pass**: validation, sanitization, HTML escaping, header-injection-safe subject, API handler (recipient, reply-to, origin, honeypot, fill time, size limit, provider failure, network failure, not configured → 503, dedupe, rate limit, Turnstile), size chooser |
| `next build` | Pass. 27 routes, all pages static, only `/api/inquiry` dynamic |
| Playwright e2e (production build + mock Resend API) | **17/17 pass** |

E2E coverage: every sitemap page returns 200 with a unique title (≤70 chars), unique description (50–160), correct canonical, exactly one H1, no skipped heading levels, no `<img>` without alt, valid JSON-LD and no page errors; every internal link resolves; robots, sitemap, legacy redirects (308) and 404 with noindex; security headers; API rejects foreign origins and GET; desktop dropdown keyboard behavior; chooser → pre-filled quote; FAQ keyboard toggle; **full quote submission to the mock email API, checking recipient `chris@stierenterprise.com`, reply-to, subject and body**; provider failure shows an error, keeps form values and sends nothing; contact submission; thank-you page doesn't claim success without a reference; no horizontal overflow at 360/414/768 px on 14 pages; mobile drawer open, Escape, focus return and navigation; sticky bar behavior; 44 px tap targets.

## 4. Defects found and fixed during QA

1. **Mobile menu unusable (critical).** The header's `backdrop-filter` made it the containing block for the fixed-position drawer, so page content covered the drawer's links. Removed the filter; covered by an e2e test.
2. Quote and contact forms sat below the sidebar on phones; the source order now puts the form first.
3. Over-long titles and descriptions on 6 pages; shortened.
4. Thank-you page showed "sent" on direct visits; it now confirms only with a valid reference.
5. Product "Also consider" row referenced a non-product slug; fixed.

## 5. Visual QA

Rendered screenshots were reviewed at 390 px and 1440 px for Home, Quote, 40 ft High Cube and Delivery. No overlap, clipping, overflow or console errors. The design uses a distinctive industrial system (navy and corten, condensed display type, data plates).

## 6. Security checks

- No secrets, the recipient address or the Resend endpoint in client bundles (grep of `.next/static`). Production source maps are disabled.
- All user input is escaped in the HTML email, the subject is stripped of line breaks, and JSON-LD escapes `<`.
- CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, and HSTS in production. `X-Powered-By` is removed.
- `npm audit --omit=dev`: **0 vulnerabilities** in production dependencies. Five advisories exist only in dev tooling (`eslint-config-next` → `fast-glob` → `micromatch`) and do not ship.
- Logs contain references and coarse metadata only, with no personal data.
- These checks are not a security certification.

## 7. Performance and accessibility notes

- All pages are pre-rendered static HTML. The hero image uses `priority`; all other images are lazy-loaded and served as AVIF/WebP at responsive sizes. Two self-hosted font families use `display: swap`. Production dependencies are `next`, `react`, `react-dom` and `server-only`.
- Lighthouse was **not run** in this container. Run PageSpeed Insights after deploy.
- Accessibility: skip link, landmarks, labelled fields, `aria-invalid` and `aria-describedby` errors with icon + text (not color alone), live regions, visible focus, reduced-motion support, and 4.5:1+ contrast on text and CTA colors. A screen-reader pass with real assistive technology has **not** been done.

## 8. Form delivery: what is and isn't verified

- **Verified:** the complete browser → API → email-provider request path, payload, recipient, reply-to, subject, failure handling and dedupe, against a local mock of Resend's `/emails` API.
- **Not yet verified:** real delivery to chris@stierenterprise.com. No Resend account or API key was available. Until `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` are set, the live form honestly responds "temporarily unavailable". After configuring them, submit one real test (see `docs/DEPLOYMENT.md` §2).

## 9. Known limitations

- Business facts (phone, address, hours, logo, offerings) are unverified, so the related UI is hidden. See `docs/OWNER-CHECKLIST.md`.
- All photos are licensed illustrative stock; the original site's gallery images could not be downloaded.
- No reviews or testimonials, because none could be verified.
- No location pages yet, because no confirmed markets.
- Rate limiting and dedupe are per server instance (see `docs/DEPLOYMENT.md` §6).
