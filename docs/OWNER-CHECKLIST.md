# Owner Checklist — information and accounts needed

The site is built to stay accurate when facts are missing: anything not yet confirmed is hidden. Each item below unlocks more of the site. Most are one-line edits in **`src/content/business.ts`**.

## A. Required before launch

- [ ] **Email delivery (Resend).** Without this, forms honestly show "temporarily unavailable" and send nothing. See `docs/DEPLOYMENT.md` §2.
  - [ ] Create a Resend account and add domain `glsc-mi.com`.
  - [ ] Add the SPF and DKIM DNS records Resend shows (at GoDaddy DNS, or wherever the domain's DNS is managed). Wait for "Verified".
  - [ ] Create an API key with sending access → `RESEND_API_KEY`.
  - [ ] Set `INQUIRY_FROM_EMAIL` (e.g. `Great Lakes Shipping Containers <quotes@glsc-mi.com>`).
  - [ ] Submit a real test quote on the deployed site and confirm it arrives at **chris@stierenterprise.com** (check spam the first time and mark "not spam").
- [ ] **Confirm offerings** in `business.offerings`:
  - `sales: true` and `delivery: true` are the working assumption. **Confirm both.**
  - `rental` — set `true` only if rentals are offered (this adds "Rent a container" and rental-length questions to the quote form).
  - `modifications` — set `true` only if custom work is offered.
- [ ] **Confirm the four "How we work" commitments** in `src/content/pages.ts` (`howWeWork`): one delivered price, condition grade named on every quote, site questions settled first, Michigan-based. Edit any that don't match how the business actually operates.
- [ ] **Review legal pages** (`/privacy`, `/terms`) with your advisor.

## B. High-impact additions (each one directly improves conversions or local SEO)

- [ ] **Phone number** → `business.phone`. This turns on the header phone link, a tap-to-call button in the sticky mobile bar, phone CTAs throughout, and `telephone` in structured data.
- [ ] **Business address** (if customers visit, or for Google Business Profile) → `business.address`. This switches structured data to `LocalBusiness` with a `PostalAddress`. Use a real address only — never a virtual office.
- [ ] **Hours** → `business.hours`.
- [ ] **Public email** (if you want one shown) → `business.publicEmail`.
- [ ] **Year founded** → `business.yearFounded`.
- [ ] **Official logo** (SVG preferred). Replace `BrandMark` in `src/components/Icons.tsx` and `src/app/icon.svg`.
- [ ] **Company photography.** Real photos of your containers, yard, trucks and deliveries outperform stock imagery. Add files to `public/images/`, register them in `src/content/images.ts` with `illustrative: false`, and swap them in. The original GoDaddy "Cargo and Freight Gallery" images could not be downloaded during the rebuild; please supply the originals.
- [ ] **Confirmed delivery markets.** Add entries to `src/content/service-areas.ts` (e.g. Metro Detroit) with genuinely local notes. Each one becomes a page at `/service-area/<slug>`, listed in the sitemap.
- [ ] **Google Business Profile.** Create or claim it with the same name, phone and URL as the site.
- [ ] **Real customer reviews.** Once you have some, add a reviews section with the customer's permission and a link to the source. Never paraphrase or invent reviews.

## C. Optional setup

- [ ] **Cloudflare Turnstile** spam protection → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- [ ] **Google Analytics 4** → `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Mark `generate_lead` as a key event.
- [ ] **Google Search Console** → `GOOGLE_SITE_VERIFICATION`, then submit `https://glsc-mi.com/sitemap.xml`.
- [ ] **Photo credits.** Confirm the photographer names in `src/content/images.ts` (they were taken from the Unsplash listing).
