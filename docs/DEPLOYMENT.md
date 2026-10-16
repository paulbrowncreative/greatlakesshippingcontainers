# Deployment Guide

## 1. Hosting (recommended: Vercel)

The site is a standard Next.js 16 app: static pages plus one Node.js API route. Vercel needs no configuration. Any Node 20.9+ host that runs `next build && next start` also works (Netlify, Render, a VPS).

1. Push this repository to GitHub (already done if you're reading this there).
2. In Vercel, go to **Add New → Project** and import `paulbrowncreative/greatlakesshippingcontainers`. The framework preset is detected as Next.js.
3. Add the environment variables from §3 (Production, and Preview if you want previews to send email).
4. Deploy, then go to **Settings → Domains**, add `glsc-mi.com` and `www.glsc-mi.com`, and update DNS as Vercel instructs (usually an `A` record for the apex and a `CNAME` for `www`). Make `glsc-mi.com` primary so `www` redirects to it.
5. HTTPS is issued automatically. The site sends an HSTS header in production.

> **Before switching DNS away from GoDaddy Website Builder:** the old site has no pages beyond the homepage. `/contact-us`, `/home`, `/gallery` and quote URL variants are already redirected.

## 2. Email delivery (Resend)

Form submissions are sent with [Resend](https://resend.com) over its REST API (`src/lib/server/mailer.ts`, no SDK needed).

1. Sign up at resend.com, go to **Domains → Add Domain**, and enter `glsc-mi.com`.
2. Add the DNS records Resend lists (MX/TXT for SPF on a `send` subdomain, and a DKIM `TXT`) at your DNS provider. Optionally add a DMARC record, e.g. `_dmarc.glsc-mi.com TXT "v=DMARC1; p=none;"`.
3. Wait until the domain shows **Verified**.
4. Go to **API Keys → Create** with *Sending access* restricted to `glsc-mi.com`. Copy it into `RESEND_API_KEY` in the host (never commit it).
5. Set `INQUIRY_FROM_EMAIL` to an address on the verified domain, e.g. `Great Lakes Shipping Containers <quotes@glsc-mi.com>`. It doesn't need to be a real mailbox, because replies go to the customer through **Reply-To**.
6. Leave `INQUIRY_TO_EMAIL` unset (it defaults to `chris@stierenterprise.com`), or set it explicitly.
7. Redeploy, submit a test quote on the live site, and confirm:
   - The email arrives at chris@stierenterprise.com with the subject `New Website Inquiry — Great Lakes Shipping Containers | …`.
   - Clicking **Reply** addresses the customer.
   - Resend → **Emails** shows the message as *Delivered*.

**Diagnosing a missing email:** every submission gets a reference like `GLSC-20261016-AB12CD`, shown to the visitor and printed in the email footer. Host logs carry JSON lines `{"scope":"inquiry","event":"sent"|"send_failed",...}` with that reference and no personal data. Resend's dashboard shows delivery status, bounces and spam complaints.

**What visitors see if email fails:** an error message, their details still filled in, and alternative contact options. They never see a false success.

## 3. Environment variables

See `.env.example` for the full list with comments.

| Variable | Required | Exposed to browser | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Yes | Canonical URL (`https://glsc-mi.com`) |
| `RESEND_API_KEY` | Yes | **No** | Email API key |
| `INQUIRY_FROM_EMAIL` | Yes | **No** | Verified sender |
| `INQUIRY_TO_EMAIL` | No | **No** | Recipient (default chris@stierenterprise.com) |
| `ALLOWED_ORIGINS` | No | **No** | Extra origins allowed to post forms (e.g. `https://www.glsc-mi.com`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | No | Site key only | Cloudflare Turnstile |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Yes | GA4 (`G-…`) |
| `GOOGLE_SITE_VERIFICATION` | No | Yes (meta tag) | Search Console |
| `RESEND_API_URL` | **Never in prod** | No | Test-only mock endpoint |

## 4. After launch

- [ ] Search Console: verify, submit `/sitemap.xml`, and request indexing for the homepage.
- [ ] Rich Results Test on `/`, a container page and a guide (Organization, BreadcrumbList, Service, Article).
- [ ] GA4: mark `generate_lead` as a key event; watch `quote_cta_click` by `location`.
- [ ] PageSpeed Insights on mobile for `/` and `/quote`.

## 5. Local development

```bash
npm install
cp .env.example .env.local   # add a Resend test key if you want to send email locally
npm run dev                  # http://localhost:3000
npm run check                # typecheck + lint + unit tests + production build
npm run build && npm run test:e2e   # end-to-end tests against a mock email API
```

In a cloud container with a preinstalled Chromium, set `PLAYWRIGHT_CHROMIUM_PATH` to that binary for the e2e run.

## 6. Notes on spam controls

Rate limiting and duplicate detection are in-memory per server instance. That is effective against bursts, but on serverless hosting each instance keeps its own counters. If abuse becomes a problem, enable Turnstile first. For strict global limits, add a shared store such as Upstash Redis in `src/lib/server/guards.ts`.
