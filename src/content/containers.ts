import { images, type SiteImage } from "./images";

/**
 * Container specifications are typical ISO dry-van figures. Actual units vary by
 * manufacturer and build year, so every spec table is labelled "typical" and buyers
 * are told the exact unit is confirmed on the quote. No prices or stock levels are
 * published because none are verified.
 */

export type Spec = { label: string; value: string; note?: string };

export type ContainerProduct = {
  slug: string;
  name: string;
  shortName: string;
  /** Large stencil numeral on cards, e.g. 20' */
  badge: string;
  heightLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  summary: string;
  image: SiteImage;
  external: Spec[];
  internal: Spec[];
  door: Spec[];
  weight: Spec[];
  capacity: Spec[];
  bestFor: { title: string; body: string }[];
  considerations: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const containers: ContainerProduct[] = [
  {
    slug: "20-ft-shipping-containers",
    name: "20 ft Standard Shipping Container",
    shortName: "20 ft Standard",
    badge: "20'",
    heightLabel: "8'6\" tall",
    metaTitle: "20 ft Shipping Containers for Sale in Michigan | Sizes & Specs",
    metaDescription:
      "20 ft shipping containers for sale with delivery in Michigan. Typical dimensions, door clearance, weight and uses — request a quote for your site.",
    h1: "20 ft Shipping Containers",
    lede:
      "The most versatile size we quote. A 20-footer fits in a driveway, behind a shop or beside a jobsite trailer and still holds the contents of a two-car garage.",
    summary: "Compact footprint for driveways, jobsites and tight commercial lots.",
    image: images.container20,
    external: [
      { label: "Length", value: "20 ft" },
      { label: "Width", value: "8 ft" },
      { label: "Height", value: "8 ft 6 in" },
    ],
    internal: [
      { label: "Length", value: "19 ft 4 in" },
      { label: "Width", value: "7 ft 8 in" },
      { label: "Height", value: "7 ft 10 in" },
    ],
    door: [
      { label: "Width", value: "7 ft 8 in" },
      { label: "Height", value: "7 ft 6 in" },
    ],
    weight: [
      { label: "Tare (empty)", value: "≈ 4,700–5,100 lb" },
      { label: "Max gross", value: "≈ 52,900–67,200 lb", note: "Per the unit's CSC plate" },
    ],
    capacity: [
      { label: "Floor area", value: "≈ 150 sq ft" },
      { label: "Volume", value: "≈ 1,170 cu ft" },
    ],
    bestFor: [
      { title: "Jobsite tool and material storage", body: "Small enough to drop near the work, big enough for gang boxes, generators and pallets of material." },
      { title: "Residential storage", body: "Garage overflow, renovation staging or seasonal equipment — where local rules allow a container on the lot." },
      { title: "Back-of-store inventory", body: "Extra stock space for retailers and restaurants without leasing more square footage." },
      { title: "Farm equipment and supplies", body: "Secure, rodent-resistant storage for feed, seed, tools and small equipment." },
    ],
    considerations: [
      "Needs a level, firm pad roughly 20 ft × 8 ft, plus room for the delivery truck to back in and tilt off.",
      "Delivered empty, a 20 ft unit is light enough for most tilt-bed trucks — confirm road and driveway weight limits in spring.",
      "Doors are on one end only (unless you request a specialty unit), so plan placement around how you'll load it.",
    ],
    faqs: [
      { q: "Will a 20 ft container fit in my driveway?", a: "Most residential driveways can hold the container itself (20 ft × 8 ft). The real limit is usually the delivery truck: it needs a straight approach, room to tilt the bed, and clear overhead space. Send us your address and a photo of the spot and we'll tell you whether it works." },
      { q: "How much can I store in a 20 ft container?", a: "About 1,170 cubic feet — roughly the contents of a two-car garage, or 10 standard pallets on the floor." },
      { q: "Is a 20 ft container half the price of a 40?", a: "Usually not. Freight, handling and delivery costs are similar for both sizes, so a 40 ft unit often costs less per square foot. If you're between sizes, ask us to quote both." },
    ],
    related: ["40-ft-shipping-containers", "40-ft-high-cube-containers"],
  },
  {
    slug: "40-ft-shipping-containers",
    name: "40 ft Standard Shipping Container",
    shortName: "40 ft Standard",
    badge: "40'",
    heightLabel: "8'6\" tall",
    metaTitle: "40 ft Shipping Containers for Sale in Michigan | Specs & Delivery",
    metaDescription:
      "40 ft standard shipping containers with delivery in Michigan. Typical inside dimensions, weight, door size and site requirements. Get a quote.",
    h1: "40 ft Shipping Containers",
    lede:
      "Twice the floor space of a 20-footer for a delivery cost that's usually close to the same. The 40 ft standard is the workhorse for commercial storage, farms and long-term projects.",
    summary: "Maximum storage per delivery for commercial, agricultural and industrial sites.",
    image: images.container40,
    external: [
      { label: "Length", value: "40 ft" },
      { label: "Width", value: "8 ft" },
      { label: "Height", value: "8 ft 6 in" },
    ],
    internal: [
      { label: "Length", value: "39 ft 6 in" },
      { label: "Width", value: "7 ft 8 in" },
      { label: "Height", value: "7 ft 10 in" },
    ],
    door: [
      { label: "Width", value: "7 ft 8 in" },
      { label: "Height", value: "7 ft 6 in" },
    ],
    weight: [
      { label: "Tare (empty)", value: "≈ 8,000–8,500 lb" },
      { label: "Max gross", value: "≈ 67,200 lb", note: "Per the unit's CSC plate" },
    ],
    capacity: [
      { label: "Floor area", value: "≈ 300 sq ft" },
      { label: "Volume", value: "≈ 2,390 cu ft" },
    ],
    bestFor: [
      { title: "Commercial and warehouse overflow", body: "Room for 20+ standard pallets, racking or long stock like pipe and lumber." },
      { title: "Construction phases and long projects", body: "One secure unit for a whole crew's materials, tools and consumables." },
      { title: "Agriculture", body: "Large equipment, bulk supplies and seasonal storage in a single lockable box." },
      { title: "Manufacturing and industrial yards", body: "Spare parts, tooling, packaging and finished-goods staging outside the building." },
    ],
    considerations: [
      "Plan for a level pad about 40 ft × 8 ft and a long, straight approach for the delivery truck.",
      "Overhead clearance matters: watch for power lines, branches and canopies along the drop path.",
      "Heavier than a 20 — check whether your road is under Michigan's spring seasonal weight restrictions before scheduling.",
    ],
    faqs: [
      { q: "How much space does delivery of a 40 ft container need?", a: "More than the container itself. A tilt-bed truck and a 40 ft unit together need a long straight run to slide it off, plus overhead clearance. We confirm the exact requirement for your site when we quote — photos and a rough measurement help." },
      { q: "Should I choose a 40 ft standard or a high cube?", a: "If you're storing pallets, boxes or equipment under 7 ft 6 in tall, the standard is fine. If you need taller items through the door, plan to add shelving or are converting the unit, the high cube's extra foot is worth it." },
      { q: "Can a 40 ft container be placed on gravel?", a: "Yes — compacted gravel is one of the most common bases. The key is that it's level and firm so the doors keep opening and closing properly." },
    ],
    related: ["40-ft-high-cube-containers", "20-ft-shipping-containers"],
  },
  {
    slug: "40-ft-high-cube-containers",
    name: "40 ft High Cube Shipping Container",
    shortName: "40 ft High Cube",
    badge: "40'HC",
    heightLabel: "9'6\" tall",
    metaTitle: "40 ft High Cube Containers for Sale in Michigan | 9'6\" Tall",
    metaDescription:
      "40 ft high cube shipping containers: one extra foot of height and about 12% more volume. Typical specs, door clearance and uses. Request a quote.",
    h1: "40 ft High Cube Containers",
    lede:
      "Same footprint as a 40 ft standard with a full foot of extra height. High cubes are the pick for tall equipment, shelving systems and any container you plan to modify.",
    summary: "An extra foot of height for tall equipment, racking and conversions.",
    image: images.containerStack,
    external: [
      { label: "Length", value: "40 ft" },
      { label: "Width", value: "8 ft" },
      { label: "Height", value: "9 ft 6 in" },
    ],
    internal: [
      { label: "Length", value: "39 ft 6 in" },
      { label: "Width", value: "7 ft 8 in" },
      { label: "Height", value: "8 ft 10 in" },
    ],
    door: [
      { label: "Width", value: "7 ft 8 in" },
      { label: "Height", value: "8 ft 5 in" },
    ],
    weight: [
      { label: "Tare (empty)", value: "≈ 8,500–8,900 lb" },
      { label: "Max gross", value: "≈ 67,200 lb", note: "Per the unit's CSC plate" },
    ],
    capacity: [
      { label: "Floor area", value: "≈ 300 sq ft" },
      { label: "Volume", value: "≈ 2,690 cu ft" },
    ],
    bestFor: [
      { title: "Tall equipment and machinery", body: "Door height of about 8 ft 5 in clears equipment that won't fit a standard unit." },
      { title: "Racking and shelving", body: "Extra headroom for a second shelf level or pallet racking." },
      { title: "Workshops and conversions", body: "Room for insulation, lighting and ductwork while keeping usable standing height." },
      { title: "Bulky, lightweight goods", body: "When you run out of space before you run out of payload, height is the cheapest volume." },
    ],
    considerations: [
      "Total height on the truck is higher than a standard — check overhead clearance on the delivery route and at the drop spot.",
      "Typically a little heavier than a standard 40, so spring road restrictions are worth checking.",
      "If you plan to modify the container later, tell us now so we can quote an appropriate unit.",
    ],
    faqs: [
      { q: "How much taller is a high cube container?", a: "One foot. The outside height is 9 ft 6 in versus 8 ft 6 in for a standard, which gives about 8 ft 10 in of interior height." },
      { q: "Is a high cube worth it for storage?", a: "If your items are tall or you plan to stack or shelve, yes. For pallets and boxes under about 7 ft, a standard 40 usually stores the same and may cost less." },
      { q: "Are 20 ft high cube containers available?", a: "They exist but are less common than 40 ft high cubes. Ask in your quote request and we'll check what we can source." },
    ],
    related: ["40-ft-shipping-containers", "20-ft-shipping-containers"],
  },
];

export function getContainer(slug: string): ContainerProduct | undefined {
  return containers.find((c) => c.slug === slug);
}

export type ConditionGrade = {
  id: string;
  name: string;
  aka?: string;
  summary: string;
  detail: string;
  goodFor: string;
  watchFor: string;
};

export const conditionGrades: ConditionGrade[] = [
  {
    id: "new",
    name: "New / One-Trip",
    aka: "1-trip, new build",
    summary: "Made recently and shipped loaded once, typically from overseas.",
    detail:
      "Clean paint, tight door gaskets and minimal dents. A one-trip container is the closest thing to new you'll find in the domestic market and the right choice when the container will be visible or modified.",
    goodFor: "Storefronts, visible commercial sites, conversions, long-term ownership.",
    watchFor: "Highest price per unit. Minor scuffs from its single voyage are normal.",
  },
  {
    id: "cargo-worthy",
    name: "Cargo-Worthy",
    aka: "CW",
    summary: "Used, but structurally sound enough to be certified for ocean shipping.",
    detail:
      "Cargo-worthy units have been in service and show it — dents, surface rust, patched panels — but their structure, floor and doors meet the standard for carrying cargo at sea.",
    goodFor: "Shipping goods, long-term storage where condition matters, resale.",
    watchFor: "Cosmetic wear and mixed paint colors. Ask whether a current survey is included.",
  },
  {
    id: "wind-water-tight",
    name: "Wind & Water Tight",
    aka: "WWT",
    summary: "Retired from shipping but sealed against rain, snow and wind.",
    detail:
      "The most common grade for on-site storage. WWT units keep the weather out and the doors lock, but they may no longer meet the structural standard for ocean freight.",
    goodFor: "Jobsite, farm and back-of-house storage at the best price.",
    watchFor: "Visible wear, dents and surface rust. Not intended for overseas shipping.",
  },
  {
    id: "as-is",
    name: "As-Is",
    summary: "Sold with known defects — holes, heavy rust or damaged doors.",
    detail:
      "As-is units can be useful for parts, low-stakes storage or projects where you'll be cutting and welding anyway. Always inspect or get detailed photos first.",
    goodFor: "Budget projects, parts, custom builds that will replace panels anyway.",
    watchFor: "May leak. Not suitable when contents must stay dry.",
  },
];
