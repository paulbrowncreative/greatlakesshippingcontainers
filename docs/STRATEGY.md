# Strategy & Research — Great Lakes Shipping Containers LLC

Research date: October 16, 2026. This document records what was found, what could not be verified, and the decisions that shaped the site.

## 1. Discovery: the existing site (glsc-mi.com)

**Method:** fetched the live homepage via a web-fetch tool. Direct `curl` to glsc-mi.com was reset by the network, and the GoDaddy image CDN (img1.wsimg.com) timed out, so the original image files could not be downloaded. `/gallery` returned 404.

**Content inventory (complete — this is everything the site contains):**

| Item | Value | Kept? |
|---|---|---|
| Business name | Great Lakes Shipping Containers LLC | Yes, everywhere |
| `<title>` | "Great Lakes Shipping Containers - Reliable Shipping Container Services" | Replaced with keyword-targeted titles |
| Tagline / H1 | "Shipping Containers for Every Need" | Yes, homepage H1 and About H2 |
| Gallery heading | "View Our Dynamic Cargo and Freight Gallery" (images not retrievable) | Not rebuilt; needs company photos |
| Social | Facebook: facebook.com/profile.php?id=61586853962323 | Yes: footer, contact, about, error states |
| "Follow us on social for updates" | — | Kept in spirit on About |
| Contact form | Name + Email + Send (GoDaddy form, destination unknown) | Replaced with real quote + contact forms |
| Email list signup | GoDaddy newsletter widget | **Removed** — no email-marketing provider exists to send to |
| Footer | © 2026, reCAPTCHA notice, "Powered by GoDaddy" | Replaced |
| Phone, address, hours, services list, prices, testimonials, history | **None present** | Left `null` in `src/content/business.ts` |

**Not found anywhere online:** no Google Business Profile, directory listing or review for "Great Lakes Shipping Containers LLC" or glsc-mi.com showed up in search. The Facebook page content could not be read without login. A search for "Stier Enterprise" (the recipient's email domain) found no public match.

**Implication:** almost no business facts are verifiable. The site is built on a **quote-based model** with every unverified fact held in one config file that hides UI and schema when the value is empty. Nothing was invented: no reviews, ratings, years in business, inventory counts, addresses or phone numbers.

## 2. Competitive analysis

Sources reviewed: Steel Tough Containers (Detroit area page), Michigan Container Pros (homepage), OnSite Storage Solutions (Detroit page). Conexwest returned 403 to automated fetching. Western Container Sales, Cascade Container and Eveon were not deep-reviewed; their patterns match the category norms below.

| Pattern | What competitors do | Opportunity for GLSC |
|---|---|---|
| Pricing | Mostly no prices (Steel Tough, Michigan Container Pros). OnSite posts prices but they **conflict between cards on the same page**. | Be honest and specific about *why* pricing is quoted ("delivered price"), and make the quote the clearest on the market. |
| Quote flow | Phone-first, or a generic form. Steel Tough lists a good "fast quote checklist" in text. | A guided multi-step form that asks exactly those checklist questions, with a review step and conditional fields. |
| Specs | Dimension tables, often inconsistent or external-only. | "Data plate" spec panels with inside, outside, door, weight and capacity, all labelled "typical". |
| Condition grades | Mentioned in passing (WWT, CW, IICL). | A dedicated, plain-English grade guide, linked from every product page and the form. |
| Delivery | Steel Tough explains gate width, clearance and surface well; most others don't. | Full delivery page with checklist plus **Michigan frost laws and freeze–thaw** guidance, which no competitor reviewed covers. |
| Trust signals | Heavy, sometimes doubtful: "everyone qualifies", Fortune 500 logos, "48 people checked prices this week", review stars. | Earn trust with transparency: named grades, one delivered price, honest photo labels. Add real reviews once collected. |
| Local pages | City pages with neighborhood and ZIP lists (Steel Tough), 20-city lists (Michigan Container Pros). | Build location pages **only** for confirmed markets, from a data file, with genuinely local content (template ready, list empty). |
| Design | Template-driven, cluttered, stock-heavy. | A distinctive industrial system: navy and steel, corten-orange action color, stencil display type, corrugation texture, data-plate components. |

## 3. Personas

1. **Contractor or site superintendent.** Needs secure jobsite storage fast; cares about delivery timing and access; phones and texts from the truck. *Needs:* quick quote, clear clearances, mobile-first.
2. **Farmer or rural property owner.** Dry, rodent-proof storage; open land; price-sensitive; long-term ownership. *Needs:* grade guidance (WWT value), 40 ft/HC specs, base prep.
3. **Business or facility manager.** Overflow inventory or parts; may need several units; needs written quotes for approval. *Needs:* specs, quantity field, company field, professional confirmation.
4. **Homeowner.** Renovation or garage overflow; driveway placement; unsure of the size and the rules. *Needs:* size chooser, permit guidance, reassurance with no jargon.

## 4. Conversion goals

- **Primary:** quote request submitted (`generate_lead` in GA4), with form `quote`.
- **Secondary:** contact message (`generate_lead`, form `contact`); phone click (`phone_click`, once a phone number is configured); Facebook visit.
- **Micro:** `quote_cta_click` (with location), `container_chooser_result`, `form_start`, `form_error`.

## 5. Sitemap

```
/                                   Home
/containers                         Size hub (compare table, chooser)
  /containers/20-ft-shipping-containers
  /containers/40-ft-shipping-containers
  /containers/40-ft-high-cube-containers
  /containers/condition-grades
/services/container-sales           Buying process
/services/delivery                  Delivery & site prep
/uses                               Industries & applications (single deep page)
/service-area                       Delivery area (+ /service-area/[slug] once markets are confirmed)
/guides                             Editorial hub
  /guides/20-ft-vs-40-ft-shipping-container
  /guides/preparing-your-site-for-container-delivery
  /guides/new-vs-used-shipping-containers
/about  /contact  /quote  /thank-you (noindex)
/privacy  /terms  /photo-credits (noindex)
```

Rentals and modifications are built as switches (`offerings` in `business.ts`), not pages. They are off until the owner confirms the services exist.

## 6. Keyword map

| Page | Primary keyword | Supporting / intent |
|---|---|---|
| `/` | shipping containers for sale Michigan | shipping container supplier Michigan; commercial investigation and transactional |
| `/containers` | shipping container sizes | container dimensions, 20 vs 40; commercial investigation |
| `/containers/20-ft-shipping-containers` | 20 ft shipping container for sale | 20ft container dimensions; transactional |
| `/containers/40-ft-shipping-containers` | 40 ft shipping container for sale | 40ft container dimensions/weight; transactional |
| `/containers/40-ft-high-cube-containers` | 40 ft high cube container | high cube dimensions, 9'6" container; transactional |
| `/containers/condition-grades` | used shipping container grades | cargo worthy vs wind and water tight, one trip container; informational/commercial |
| `/services/container-sales` | buy shipping container Michigan | used shipping containers Michigan; transactional |
| `/services/container-rentals` | shipping container rental Michigan | storage container rental, rent a container; transactional |
| `/services/delivery` | shipping container delivery Michigan | container delivery requirements, site prep; informational/local |
| `/uses` | shipping container storage uses | jobsite storage container, farm storage container, commercial storage containers |
| `/service-area` | shipping container delivery near me (MI) | local; to be extended with Metro Detroit and other confirmed markets |
| `/guides/20-ft-vs-40-ft…` | 20ft vs 40ft container | informational, feeds product pages |
| `/guides/preparing-your-site…` | shipping container site preparation | informational, feeds delivery page |
| `/guides/new-vs-used…` | new vs used shipping containers | informational, feeds grades and sales pages |

**Next keyword targets, once confirmed by the owner:** "shipping containers Metro Detroit / Grand Rapids / Lansing" as real location pages; "shipping container rental Michigan" if rentals are offered; "custom shipping container modifications" if offered.

## 7. Design direction

- **Palette:** deep navy `#0b1f33` (Great Lakes depth), steel grays, warm paper `#f4f2ed`, lake blue `#1e6bb8` for links and focus, and **corten orange `#b5441a`**, kept for calls to action and accents. It ties to weathering-steel containers, and white text on it is 5.3:1 contrast (AA).
- **Type:** Barlow Condensed (stencil-adjacent display, uppercase H1/H2) with IBM Plex Sans (engineered, legible body). Two families, self-hosted via `next/font`.
- **Signature components:** data-plate spec panels, container "door-end" brand mark with a lake wave, numbered steps, corrugation texture on dark sections, large stencil size badges on cards.
- **Logo:** the original logo could not be retrieved. The site uses an interim mark plus a wordmark (`BrandMark` in `src/components/Icons.tsx`). Replace it with the official logo when supplied.

## 8. Technical architecture

- **Next.js 16 (App Router), React 19, TypeScript.** All pages are statically pre-rendered; only `/api/inquiry` runs server-side.
- **No CSS framework:** a single token-driven stylesheet (`src/app/globals.css`).
- **Forms:** one shared validation module (`src/lib/inquiry.ts`) used by the browser and the server. The API route (`src/lib/server/handle-inquiry.ts`) checks origin, content type, rate limit, body size, honeypot, minimum fill time, validation, link-spam, optional Turnstile and duplicate fingerprint, then sends through **Resend**, and reports success only when Resend returns an email id.
- **No database:** the email in the recipient's inbox is the record. Resend's dashboard logs every send (and failure) for diagnosis. Server logs carry the reference and coarse metadata, never personal data.
- **Dependencies:** `next`, `react`, `react-dom`, `server-only`. Nothing else ships to production.

## 9. Facts confirmed from owner-supplied photos (added after launch build)

- **Logo:** Great Lakes map over "GREAT LAKES / SHIPPING CONTAINERS / SALES & RENTALS", in royal blue (sampled at about `#143AC4`). This confirms **rentals**. The map was traced to vector for the brand mark, and the accent color was moved to the brand blue. The corten-orange CTA color is kept deliberately as a high-contrast complement to the blue.
- **Phone:** (586) 265-7744, from the door signage on the company truck (legible in three photos).
- **Delivery equipment:** Ford F-350 dually with a gooseneck flatbed trailer. Delivery copy no longer assumes a tilt-bed truck. The unloading method is confirmed per quote.
- **Inventory seen:** new one-trip 20 ft (22G1) and 20 ft high cube (25G1), new 40 ft high cube (45G1), used 40 ft high cube in quantity, and used 20 ft and 40 ft standard. The site describes these as example units and makes no stock claims.

## 10. Blog keyword map (added October 17, 2026)

Each post targets one primary phrase and links into the pages it supports. Those pages list it under "Related reading". Search volumes were not available (no SEO-tool access in this environment), so targets were chosen by commercial intent and topical fit. Validate them in Search Console after launch.

| Post | Primary keyword | Intent | Supports |
|---|---|---|---|
| shipping-container-cost | shipping container cost | Commercial investigation | Sales, containers hub, quote |
| rent-vs-buy-shipping-container | rent vs buy shipping container | Commercial investigation | Rentals, sales |
| shipping-container-permit-michigan | shipping container permit Michigan | Informational, local | Delivery, service area, rentals |
| michigan-frost-laws-container-delivery | Michigan frost laws | Informational, local | Delivery, service area |
| keep-storage-container-dry | shipping container condensation | Informational | Grades, 20 ft, 40 ft |
| secure-shipping-container-jobsite | shipping container security | Informational | Uses, 20 ft, rentals |
| high-cube-vs-standard-container | high cube vs standard container | Commercial investigation | 40 ft HC, 40 ft, containers hub |
| 20-ft-vs-40-ft-shipping-container | 20ft vs 40ft container | Commercial investigation | Containers hub, 20 ft, 40 ft |
| preparing-your-site-for-container-delivery | shipping container site preparation | Informational | Delivery, service area |
| new-vs-used-shipping-containers | new vs used shipping containers | Commercial investigation | Grades, sales |

**Next posts to consider** (once the owner can confirm details): container modifications (if offered), farm storage case study with photos, a real customer delivery story (with permission), and pages for each confirmed Michigan delivery market.

## 11. Color update (client direction, October 17, 2026)

The client asked for light blue as the main color, with white and black supporting. This replaces the navy and corten palette in §7.

| Role | Color | Use |
|---|---|---|
| Primary | `#4FB8F2` light blue | Buttons (black text), CTA bands, full-blue sections, badges, accents on black |
| Supporting | `#0B0B0C` black | Header, hero overlay, page banners, footer, dark sections |
| Supporting | `#FFFFFF` white | Content areas, cards, forms |
| Text-safe blue | `#0A6AA8` | Links and small accents on white or tints (5.8:1) |
| Tints | `#DDEFFB`, `#D2EAFA` | Alternating section backgrounds |

The official logo stays royal blue (`#143AC4`) wherever it appears on white. On dark backgrounds, the logo's map now uses the light blue. Every pairing was contrast-checked, and the axe scan reports 0 contrast violations.
