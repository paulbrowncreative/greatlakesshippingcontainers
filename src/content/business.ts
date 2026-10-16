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
  state: "Michigan",
  stateCode: "MI",

  /** Public contact details. Leave null until the owner confirms them. */
  phone: null as string | null, // e.g. "(248) 555-0100" — display format
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
   * What the company sells or provides. `sales` and `delivery` are the working assumption
   * for a container supplier and must be confirmed by the owner. Rental and modification
   * pages are built but stay unpublished until switched on.
   */
  offerings: {
    sales: true,
    delivery: true,
    rental: false,
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
