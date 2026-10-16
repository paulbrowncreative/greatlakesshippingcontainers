/**
 * Single source of truth for business facts.
 *
 * Only values verified from the company's existing website (glsc-mi.com) or supplied
 * by the owner belong here. Anything left `null` is hidden by the UI and omitted from
 * structured data — never fill these with guesses. See docs/OWNER-CHECKLIST.md.
 */

export type Offering = "sales" | "delivery" | "rental" | "modifications";

export const business = {
  name: "Great Lakes Shipping Containers",
  legalName: "Great Lakes Shipping Containers LLC",
  shortName: "Great Lakes Containers",
  /** Existing site tagline, kept as brand continuity. */
  tagline: "Shipping Containers for Every Need",
  /** Line from the company logo. */
  logoLine: "Sales & Rentals",
  state: "Michigan",
  stateCode: "MI",

  /** Public contact details. Leave null until the owner confirms them. */
  // Read from the company truck door signage in owner-supplied photos — confirm with owner.
  phone: "(586) 265-7744" as string | null,
  publicEmail: null as string | null,
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  },
  hours: null as string | null, // e.g. "Mon–Fri 8am–5pm, Sat by appointment"
  yearFounded: null as number | null,

  /** Verified from the existing website footer. */
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61586853962323",
  },

  /**
   * What the company provides. Sales and rentals come from the company logo ("Sales &
   * Rentals"); delivery from owner photos of the company truck and gooseneck trailer.
   * Modifications are unconfirmed and stay off.
   */
  offerings: {
    sales: true,
    delivery: true,
    rental: true,
    modifications: false,
  } satisfies Record<Offering, boolean>,
} as const;

export function offers(o: Offering): boolean {
  return business.offerings[o];
}

/** Digits-only tel: href, or null when no phone is configured. */
export function phoneHref(): string | null {
  if (!business.phone) return null;
  const digits = business.phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") ? digits : `+1${digits}`}`;
}
