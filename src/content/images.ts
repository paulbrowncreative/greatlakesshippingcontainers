/**
 * Image registry. `illustrative: true` marks licensed stock (or photos whose origin
 * isn’t the company’s own yard) — those render with an "Illustrative photo" caption.
 * Company photos are supplied by the owner (`illustrative: false`); they show example
 * units, so captions never imply a specific unit is in stock.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Third-party credit. Omitted for company-supplied photos. */
  credit?: { name: string; url: string };
  illustrative: boolean;
};

/** Credit links point at the exact Unsplash source file used. */
const unsplash = (photographer: string, photoId: string) => ({
  name: photographer,
  url: `https://images.unsplash.com/photo-${photoId}`,
});

export const images = {
  // --- Company photos (supplied by Great Lakes Shipping Containers) ---
  hero: {
    src: "/images/glsc-40ft-high-cube-new.jpg",
    width: 2000,
    height: 1500,
    alt: "A new beige 40 ft high cube shipping container marked 9'6\" high, with more containers stacked behind it in a gravel yard",
    illustrative: false,
  },
  container20: {
    src: "/images/glsc-20ft-winter-lot.jpg",
    width: 880,
    height: 1168,
    alt: "A red 20 ft shipping container placed on a plowed parking lot with snow on the ground at dusk",
    illustrative: false,
  },
  highCube: {
    src: "/images/glsc-high-cube-side-doors.jpg",
    width: 2000,
    height: 1135,
    alt: "New beige 9'6\" high cube containers with several sets of side doors, stacked two high",
    illustrative: false,
  },
  usedStack: {
    src: "/images/glsc-used-20ft-stack.jpg",
    width: 880,
    height: 1168,
    alt: "Used red 20 ft shipping containers stacked two high in a gravel yard",
    illustrative: false,
  },

  new20: {
    src: "/images/glsc-new-20ft-one-trip.jpg",
    width: 1500,
    height: 1500,
    alt: "New beige one-trip 20 ft shipping containers stacked in a gravel yard, with cargo doors closed",
    illustrative: false,
  },
  used40Yard: {
    src: "/images/glsc-used-40ft-yard.jpg",
    width: 2000,
    height: 1500,
    alt: "Used 40 ft high cube shipping containers in red, blue and orange stacked several high in a container yard",
    illustrative: false,
  },
  deliveryYard: {
    src: "/images/glsc-delivery-truck-yard.jpg",
    width: 2000,
    height: 1500,
    alt: "A white Great Lakes Shipping Containers pickup truck with a gooseneck flatbed trailer carrying a used 40 ft container",
    illustrative: false,
  },
  deliveryRural: {
    src: "/images/glsc-delivery-rural-road.jpg",
    width: 1500,
    height: 1125,
    alt: "The Great Lakes Shipping Containers truck and gooseneck trailer hauling a 40 ft container down a gravel road lined with bare trees",
    illustrative: false,
  },
  newOnTrailer: {
    src: "/images/glsc-new-40ft-on-trailer.jpg",
    width: 2000,
    height: 1080,
    alt: "A new beige 40 ft high cube container strapped to a gooseneck trailer behind a white pickup, with stacks of new containers behind",
    illustrative: false,
  },

  truckYard: {
    src: "/images/glsc-truck-container-yard.jpg",
    width: 1320,
    height: 947,
    alt: "The Great Lakes Shipping Containers pickup and gooseneck trailer parked beside stacks of 40 ft high cube containers on a sunny day",
    illustrative: false,
  },

  // --- Illustrative stock photos ---
  agriculture: {
    src: "/images/container-agriculture-hay.jpg",
    width: 1800,
    height: 1202,
    alt: "A farm worker loading hay bales into an open shipping container",
    credit: unsplash("Land O’Lakes, Inc.", "1761839257874-e56dfa2260cb"),
    illustrative: true,
  },
} satisfies Record<string, SiteImage>;
