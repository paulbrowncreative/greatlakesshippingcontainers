# Great Lakes Shipping Containers — website

Production website for **Great Lakes Shipping Containers LLC** (glsc-mi.com): shipping container sales and delivery in Michigan, built around a delivered-quote workflow.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · plain CSS design tokens · Resend for transactional email
- **Primary conversion:** the multi-step quote request at `/quote`. Every inquiry is emailed to **chris@stierenterprise.com**.

## Quick start

```bash
npm install
cp .env.example .env.local     # add RESEND_API_KEY + INQUIRY_FROM_EMAIL to send real email
npm run dev                    # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run check` | Typecheck, lint, unit tests and production build |
| `npm test` | Unit tests (validation, email template, API handler, size chooser) |
| `npm run test:e2e` | Playwright end-to-end tests against the production build with a mock email API (run `npm run build` first) |

## Where things live

```
src/content/business.ts      Business facts. Unverified values stay null and are hidden. START HERE.
src/content/containers.ts    Container sizes, specs, FAQs, condition grades
src/content/pages.ts         Commitments, uses/industries, FAQs
src/content/guides.ts        Editorial guides
src/content/service-areas.ts Location pages (empty until markets are confirmed)
src/content/images.ts        Image registry with credits and an "illustrative" flag
src/lib/inquiry.ts           Shared form schema and validation (browser + server)
src/lib/server/*             API handler, spam guards, Resend mailer, email template
src/lib/seo.ts               Metadata and JSON-LD helpers
src/app/globals.css          Design system (tokens + components)
```

## Documentation

- [`docs/OWNER-CHECKLIST.md`](docs/OWNER-CHECKLIST.md): what the business owner needs to supply or confirm
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): hosting, Resend/DNS setup, environment variables
- [`docs/STRATEGY.md`](docs/STRATEGY.md): research, competitive analysis, personas, sitemap, keyword map, design direction
- [`docs/QA-REPORT.md`](docs/QA-REPORT.md): test results and known limitations

## Content rules

No fabricated reviews, ratings, prices, inventory, addresses, phone numbers or credentials. Stock photos are labelled "Illustrative". Location pages exist only for markets the company has confirmed.
