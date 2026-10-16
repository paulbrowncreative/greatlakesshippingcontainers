/**
 * Image registry. `illustrative: true` marks licensed stock (or photos whose origin
 * isn't the company's own yard) — those render with an "Illustrative photo" caption.
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

  // --- Illustrative photos ---
  portYard: {
    src: "/images/port-container-yard.jpg",
    width: 784,
    height: 1168,
    alt: "Rows of shipping containers in a port container yard with gantry cranes in the distance",
    illustrative: true,
  },
  container40: {
    src: "/images/container-40ft-lot.jpg",
    width: 1800,
    height: 1200,
    alt: "A 40 ft orange shipping container sitting on a paved commercial lot",
    credit: unsplash("Arno Senoner", "1766945206843-eac0b1aa0343"),
    illustrative: true,
  },
  craneLift: {
    src: "/images/container-crane-lift.jpg",
    width: 1800,
    height: 1200,
    alt: "A crane lifting a dark green shipping container into position against a blue sky",
    credit: unsplash("Rook of Arts", "1776938437751-33111079b460"),
    illustrative: true,
  },
  agriculture: {
    src: "/images/container-agriculture-hay.jpg",
    width: 1800,
    height: 1202,
    alt: "A farm worker loading hay bales into an open shipping container",
    credit: unsplash("Land O'Lakes, Inc.", "1761839257874-e56dfa2260cb"),
    illustrative: true,
  },
  sitePlacement: {
    src: "/images/container-site-placement.jpg",
    width: 1800,
    height: 1200,
    alt: "A single light gray shipping container placed on level ground at the edge of a wooded property",
    credit: unsplash("Arlind Photography", "1790364755326-ad7b61618cf2"),
    illustrative: true,
  },
} satisfies Record<string, SiteImage>;
