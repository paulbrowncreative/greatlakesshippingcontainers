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
  - `sales` and `rental` are **on**, based on the logo ("Sales & Rentals"). `delivery` is **on**, based on the photos of the company pickup and gooseneck trailer.
  - **Rental terms:** the rentals page promises delivery and pickup, but states no minimum term, rate or condition. Confirm, or tell us what to say.
  - `modifications` — set `true` only if custom work is offered.
- [ ] **Confirm the four "How we work" commitments** in `src/content/pages.ts` (`howWeWork`): one delivered price, condition grade named on every quote, site questions settled first, Michigan-based. Edit any that don't match how the business actually operates.
- [ ] **Review legal pages** (`/privacy`, `/terms`) with your advisor.

## B. High-impact additions (each one directly improves conversions or local SEO)

- [ ] **Confirm phone number (586) 265-7744.** This was read from the truck door signage in your photos and is now live everywhere: header, sticky mobile bar, CTAs and structured data. Change `business.phone` if it's wrong.
- [ ] **Business address** (if customers visit, or for Google Business Profile) → `business.address`. This switches structured data to `LocalBusiness` with a `PostalAddress`. Use a real address only — never a virtual office.
- [ ] **Hours** → `business.hours`.
- [ ] **Public email** (if you want one shown) → `business.publicEmail`.
- [ ] **Year founded** → `business.yearFounded`.
- [ ] **Original logo file** (SVG/AI/EPS preferred). The Great Lakes map was traced from a photo watermark and is used in the header, footer, favicon and share image (`src/components/BrandMark.tsx`). A true vector would sharpen it. The site's blue accent (`#143AC4`) was sampled from the logo; confirm it against your brand color.
- [x] **Company photography (first batch added).** Four supplied photos now appear on the home hero, the 20 ft and 40 ft high cube pages, condition grades, and container sales. **Please confirm they are the company's own photos and OK to publish.** More would help, especially a 40 ft standard unit, a delivery in progress (truck or tilt-bed) and a farm or jobsite placement, which still use labelled stock. Add files to `public/images/`, register them in `src/content/images.ts` with `illustrative: false`, and they render without the "Illustrative" caption.
- [ ] **Confirmed delivery markets.** Add entries to `src/content/service-areas.ts` (e.g. Metro Detroit) with genuinely local notes. Each one becomes a page at `/service-area/<slug>`, listed in the sitemap.
- [ ] **Google Business Profile.** Create or claim it with the same name, phone and URL as the site.
- [ ] **Real customer reviews.** Once you have some, add a reviews section with the customer's permission and a link to the source. Never paraphrase or invent reviews.

## C. Optional setup

- [ ] **Cloudflare Turnstile** spam protection → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- [ ] **Google Analytics 4** → `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Mark `generate_lead` as a key event.
- [ ] **Google Search Console** → `GOOGLE_SITE_VERIFICATION`, then submit `https://glsc-mi.com/sitemap.xml`.
- [ ] **Photo credits.** Confirm the photographer names in `src/content/images.ts` (they were taken from the Unsplash listing). The supplied aerial port photo is captioned "Illustrative photo" because it doesn't show your yard; tell us if it's yours.
