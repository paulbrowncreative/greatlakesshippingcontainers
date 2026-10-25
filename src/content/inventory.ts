import { getContainer, type ContainerProduct } from "./containers";
import type { SiteImage } from "./images";

/**
 * Specific containers the owner has supplied photos of. Renders /inventory, the homepage
 * "Available now" strip and the unit line on quote requests (/quote?unit=GL-001).
 *
 * Rules:
 * - Describe only what the photo shows or the owner confirmed. Leave `grade` and `price`
 *   null until the owner supplies them; the UI then says "Grade confirmed on quote" and
 *   "Request a quote".
 * - When a unit sells, set `status: "sold"` (it disappears from the site) rather than
 *   deleting it, so old quote links still resolve to a readable unit name in the email.
 * - IDs are permanent. Never reuse one.
 */

export type UnitSize = "20-standard" | "40-standard" | "40-high-cube";
export type UnitStatus = "available" | "pending" | "sold";

export type InventoryUnit = {
  id: string;
  size: UnitSize;
  /** Variant beyond the standard dry van, e.g. "Open side". */
  variant?: string;
  /** Visible from the photo: "Used" when wear is obvious; omit when it can't be told. */
  age?: "Used" | "New";
  color: string;
  /** Condition grade value from lib/inquiry `conditions`, once the owner confirms it. */
  grade: "new" | "cargo-worthy" | "wind-water-tight" | null;
  /** Delivered or yard price in whole dollars, once the owner wants prices shown. */
  price: number | null;
  status: UnitStatus;
  /** What a buyer can see in the photo. Plain, specific, never sales puffery. */
  notes: string;
  image: SiteImage;
};

const productSlug: Record<UnitSize, string> = {
  "20-standard": "20-ft-shipping-containers",
  "40-standard": "40-ft-shipping-containers",
  "40-high-cube": "40-ft-high-cube-containers",
};

const photo = (file: string, width: number, height: number, alt: string): SiteImage => ({
  src: `/images/inventory/${file}.jpg`,
  width,
  height,
  alt,
  illustrative: false,
});

export const inventory: InventoryUnit[] = [
  {
    id: "GL-001",
    size: "40-high-cube",
    age: "Used",
    color: "Blue-grey",
    grade: null,
    price: null,
    status: "available",
    notes: "Door markings read 45G1 (40 ft, 9'6\" high). Weathered paint with surface rust along the side panels and corner posts.",
    image: photo(
      "gl-001-40ft-high-cube-used-blue-grey",
      1600,
      1200,
      "Used blue-grey 40 ft high cube shipping container with CMA CGM markings, viewed from the cargo-door end",
    ),
  },
  {
    id: "GL-002",
    size: "40-high-cube",
    color: "Dark grey",
    grade: null,
    price: null,
    status: "available",
    notes: "Even dark grey paint with light scuffs and a few small dents on the long side. High-cube hazard striping on the top rails.",
    image: photo(
      "gl-002-40ft-high-cube-dark-grey",
      1600,
      1200,
      "Dark grey 40 ft high cube shipping container shown from the side, with light scuffs on the corrugated panels",
    ),
  },
  {
    id: "GL-003",
    size: "40-standard",
    age: "Used",
    color: "Blue",
    grade: null,
    price: null,
    status: "available",
    notes: "Faded blue paint with rust on the door frame, corner posts and lower rail. Cargo doors with four locking bars.",
    image: photo(
      "gl-003-40ft-standard-used-blue",
      1664,
      1184,
      "Used blue 40 ft standard shipping container with CMA CGM lettering on the side, cargo doors closed",
    ),
  },
  {
    id: "GL-004",
    size: "40-high-cube",
    age: "Used",
    color: "Blue",
    grade: null,
    price: null,
    status: "available",
    notes: "Door markings read 45G1 with a 9'6\" high-container caution label. Paint wear along the side and rust on the door-end frame.",
    image: photo(
      "gl-004-40ft-high-cube-used-blue",
      1632,
      1216,
      "Used blue 40 ft high cube shipping container with APL markings and a 9'6\" high container caution label on the doors",
    ),
  },
  {
    id: "GL-005",
    size: "40-high-cube",
    variant: "Open side",
    color: "Beige",
    grade: null,
    price: null,
    status: "available",
    notes:
      "Full-length side doors that fold open along one wall, plus standard cargo doors on the end. Clean paint and a clean interior in the photo.",
    image: photo(
      "gl-005-40ft-high-cube-open-side-beige",
      1600,
      1200,
      "Beige 40 ft high cube open-side shipping container with all four pairs of side doors swung open, showing the empty interior",
    ),
  },
  {
    id: "GL-006",
    size: "40-high-cube",
    variant: "Open side",
    color: "Beige",
    grade: null,
    price: null,
    status: "available",
    notes:
      "Door markings read 4563 (40 ft, 9'6\" high). Four pairs of lockable side doors along one wall plus cargo doors on the end. Clean, even paint in the photo.",
    image: photo(
      "gl-006-40ft-high-cube-open-side-beige",
      1408,
      1408,
      "Beige 40 ft high cube open-side shipping container with four pairs of side doors closed, viewed from the cargo-door end",
    ),
  },
  {
    id: "GL-007",
    size: "40-high-cube",
    variant: "Open side",
    color: "Light grey",
    grade: null,
    price: null,
    status: "available",
    notes:
      "Door markings read 45G3 with a 9'6\" height label. Four pairs of lockable side doors along one wall. Clean, even paint in the photo.",
    image: photo(
      "gl-007-40ft-high-cube-open-side-grey",
      1600,
      1200,
      "Light grey 40 ft high cube shipping container with four pairs of side doors along its length, all closed",
    ),
  },
  {
    id: "GL-008",
    size: "40-high-cube",
    color: "Beige",
    grade: null,
    price: null,
    status: "available",
    notes:
      "Door markings read 45G1 (40 ft, 9'6\" high), 76.4 cu m capacity. Clean paint with light staining on the door-end corner post. Standard cargo doors.",
    image: photo(
      "gl-008-40ft-high-cube-beige",
      1600,
      1200,
      "Beige 40 ft high cube shipping container with cargo doors closed and clean corrugated side walls",
    ),
  },
  {
    id: "GL-009",
    size: "40-high-cube",
    variant: "Double door",
    color: "Beige",
    grade: null,
    price: null,
    status: "available",
    notes:
      "Cargo doors on both ends, so you can load from either side or drive straight through. Clean interior walls and wood floor in the photo.",
    image: photo(
      "gl-009-40ft-double-door-beige",
      1200,
      900,
      "Beige 40 ft double-door shipping container with one end's doors swung open, showing a clean interior and the second set of doors at the far end",
    ),
  },
  {
    id: "GL-010",
    size: "40-high-cube",
    age: "Used",
    color: "Red",
    grade: null,
    price: null,
    status: "available",
    notes:
      "Door markings read 45G1 with a 9'6\" height label. Faded paint, rust on the door-end frame and corner posts, and chalk marks on the side.",
    image: photo(
      "gl-010-40ft-high-cube-used-red",
      1600,
      1200,
      "Used red 40 ft high cube shipping container with TAL markings, viewed from the cargo-door end",
    ),
  },
  {
    id: "GL-011",
    size: "20-standard",
    age: "Used",
    color: "Red",
    grade: null,
    price: null,
    status: "available",
    notes: "Side markings read 22G1 (20 ft, 8'6\" high). Faded paint, dents along the long side and rust on the corner posts.",
    image: photo("gl-011-20ft-used-red", 959, 719, "Used red 20 ft standard shipping container with TAL markings, viewed from the cargo-door corner"),
  },
  {
    id: "GL-012",
    size: "20-standard",
    age: "Used",
    color: "Yellow",
    grade: null,
    price: null,
    status: "available",
    notes: "Door markings read 22G1, 33.2 cu m capacity. Rust streaking on the side panels, door frame and corner castings.",
    image: photo("gl-012-20ft-used-yellow", 1600, 1200, "Used yellow 20 ft standard shipping container with MSC markings and rust along the corner posts"),
  },
  {
    id: "GL-013",
    size: "20-standard",
    color: "Beige",
    grade: null,
    price: null,
    status: "available",
    notes: "Door markings read 22G1, 33.2 cu m capacity. Clean, even paint and bright locking hardware in the photo.",
    image: photo("gl-013-20ft-beige", 1528, 1146, "Beige 20 ft standard shipping container with cargo doors closed and clean paint"),
  },
  {
    id: "GL-014",
    size: "20-standard",
    variant: "Open side",
    color: "Beige",
    grade: null,
    price: null,
    status: "available",
    notes: "Door markings read 22GG. Two pairs of lockable side doors along one wall plus cargo doors on the end. Clean paint in the photo.",
    image: photo(
      "gl-014-20ft-open-side-beige",
      1550,
      1162,
      "Beige 20 ft open-side shipping container with two pairs of side doors and the end cargo doors closed",
    ),
  },
  {
    id: "GL-015",
    size: "20-standard",
    variant: "Double door",
    color: "Dark grey",
    grade: null,
    price: null,
    status: "available",
    notes: "Markings read 22G1. Cargo doors on both ends (one pair shown open). Clean, even paint in the photo.",
    image: photo(
      "gl-015-20ft-double-door-dark-grey",
      1600,
      1200,
      "Dark grey 20 ft double-door shipping container with the far-end doors open and the near-end doors closed",
    ),
  },
];

/** Units shown on the site, in listing order. */
export const availableUnits = inventory.filter((u) => u.status !== "sold");

export function getUnit(id: string): InventoryUnit | undefined {
  return inventory.find((u) => u.id === id.toUpperCase());
}

export function unitProduct(u: InventoryUnit): ContainerProduct {
  return getContainer(productSlug[u.size])!;
}

/** "40 ft high cube, open side" */
export function unitTitle(u: InventoryUnit): string {
  const base = unitProduct(u).shortName;
  return u.variant ? `${base}, ${u.variant.toLowerCase()}` : base;
}

/** One-line label used in quote emails and the form: "GL-005 · 40 ft high cube, open side · Beige". */
export function unitLabel(u: InventoryUnit): string {
  return [u.id, unitTitle(u), [u.age, u.color].filter(Boolean).join(" ")].join(" · ");
}

export const sizeFilters: { value: UnitSize; label: string }[] = [
  { value: "20-standard", label: "20 ft" },
  { value: "40-standard", label: "40 ft standard" },
  { value: "40-high-cube", label: "40 ft high cube" },
];
