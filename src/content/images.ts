/**
 * Every photo on the site is a licensed illustrative image (Unsplash License), not
 * Great Lakes Shipping Containers inventory. Captions and the /photo-credits page
 * say so. Replace with company photography as it becomes available — keep the
 * `illustrative` flag accurate so captions stay honest.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: { name: string; url: string };
  illustrative: boolean;
};

/** Credit links point at the exact Unsplash source file used. */
const unsplash = (photographer: string, photoId: string) => ({
  name: photographer,
  url: `https://images.unsplash.com/photo-${photoId}`,
});

export const images = {
  hero: {
    src: "/images/container-yard-row.jpg",
    width: 2400,
    height: 1600,
    alt: "A row of used 20 ft and 40 ft shipping containers lined up in a gravel yard beside a brick industrial building",
    credit: unsplash("Josh Snader", "1763325088554-529181f76960"),
    illustrative: true,
  },
  container20: {
    src: "/images/container-20ft-doors.jpg",
    width: 1600,
    height: 1762,
    alt: "Cargo doors and locking bars on the end of an orange steel shipping container",
    credit: unsplash("David Birozy", "1684119697588-011c0b206dab"),
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
  containerDoors: {
    src: "/images/container-doors-blue.jpg",
    width: 1600,
    height: 1728,
    alt: "Close view of a used blue shipping container's doors showing wear, CSC labels and lock rods",
    credit: unsplash("David Birozy", "1684119698172-ec912168c84f"),
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
  winterYard: {
    src: "/images/container-yard-winter.jpg",
    width: 2000,
    height: 1333,
    alt: "Stacks of shipping containers in a container yard with snow on the ground",
    credit: unsplash("Jp Valery", "1485717176797-ee010b5cd338"),
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
  containerStack: {
    src: "/images/container-stack.jpg",
    width: 1600,
    height: 1067,
    alt: "Shipping containers in many colors stacked several units high",
    credit: unsplash("Julia Taubitz", "1784914185452-5b73dc4ea306"),
    illustrative: true,
  },
} satisfies Record<string, SiteImage>;
