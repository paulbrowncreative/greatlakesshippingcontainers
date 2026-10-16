import { images, type SiteImage } from "./images";

/**
 * Operating commitments. These describe how the quote process on this site works;
 * the owner should confirm each one (docs/OWNER-CHECKLIST.md).
 */
export const howWeWork = [
  {
    title: "One delivered price",
    body: "Your quote covers the container and delivery to your site, so the number you approve is the number you pay.",
  },
  {
    title: "The grade, stated plainly",
    body: "Every quote names the condition — one-trip, cargo-worthy or wind & water tight — so you know what's arriving.",
  },
  {
    title: "Site questions first",
    body: "Approach, overhead clearance and ground surface are settled before delivery day, not on it.",
  },
  {
    title: "Michigan-based",
    body: "A Michigan company that knows frost laws, freeze–thaw ground and what a January delivery takes.",
  },
];

export type Use = { id: string; title: string; short: string; body: string[]; sizes: string; image?: SiteImage };

export const uses: Use[] = [
  {
    id: "construction",
    title: "Construction & contractors",
    short: "Lockable jobsite storage for tools, materials and equipment — close to the work.",
    body: [
      "Theft and weather are the two biggest risks to materials left on a jobsite. A steel container secured with a heavy-duty padlock — ideally inside a lockbox — handles both, and it sits where your crew needs it rather than in a trailer across the lot.",
      "For multi-phase projects, a 40 ft unit holds a full crew's tools, consumables and pallets of material. On tight urban or residential sites, a 20 ft unit fits where a trailer won't.",
    ],
    sizes: "20 ft for tight sites; 40 ft for multi-trade projects.",
  },
  {
    id: "agriculture",
    title: "Farms & agriculture",
    short: "Dry, rodent-resistant storage for feed, seed, tools and equipment.",
    body: [
      "Containers keep feed, seed, fertilizer and small equipment dry and out of reach of rodents — without the cost or permitting of a new pole barn.",
      "Placed on a compacted gravel pad, a container stays level through Michigan's freeze–thaw cycles. A 40 ft high cube clears taller implements and leaves room for shelving.",
    ],
    sizes: "40 ft standard or high cube for most farm use.",
    image: images.agriculture,
  },
  {
    id: "commercial",
    title: "Retail & commercial",
    short: "Back-of-house inventory and seasonal stock without leasing more space.",
    body: [
      "Retailers, restaurants and property managers use containers for overflow inventory, seasonal displays, fixtures and records — at a fraction of the cost of more square footage.",
      "For customer-facing locations, a one-trip container looks clean and can be painted to match your building.",
    ],
    sizes: "20 ft behind a store; 40 ft for distribution and seasonal peaks.",
  },
  {
    id: "industrial",
    title: "Manufacturing & industrial",
    short: "Spare parts, tooling, packaging and finished-goods staging outside the plant.",
    body: [
      "Free up floor space inside the building by moving slow-moving parts, tooling, dunnage and packaging into secure yard storage.",
      "Containers can be grouped and labeled as a simple outdoor storeroom, and moved again when the layout changes.",
    ],
    sizes: "40 ft standard; multiple units for larger yards.",
  },
  {
    id: "residential",
    title: "Homeowners",
    short: "Renovation staging, garage overflow and seasonal storage on your own property.",
    body: [
      "During a remodel or move, a container keeps furniture and belongings secure on your own driveway instead of across town in a storage unit.",
      "Check your city, township or HOA rules first — many allow containers temporarily or with a permit.",
    ],
    sizes: "20 ft fits most driveways.",
  },
  {
    id: "municipal",
    title: "Schools, churches & nonprofits",
    short: "Storage for athletic equipment, event supplies and maintenance gear.",
    body: [
      "Athletic programs, facilities teams and community organizations use containers for field equipment, chairs and tables, holiday decorations and grounds-keeping gear.",
      "A single lockable unit replaces scattered closets and sheds.",
    ],
    sizes: "20 ft or 40 ft, depending on the space available.",
  },
];

export const homeFaqs = [
  {
    q: "How much does a shipping container cost?",
    a: "Price depends on size, condition grade, current availability and how far the container travels to your site. Rather than publish a number that changes week to week, we quote a delivered price for your ZIP code — usually after a couple of quick questions about access.",
  },
  {
    q: "What information do you need for a quote?",
    a: "The size (or what you plan to store), how many, your delivery ZIP code, when you need it, and anything unusual about site access. Photos of the drop spot are helpful but not required.",
  },
  {
    q: "What's the difference between new and used containers?",
    a: "A new or one-trip container has made a single voyage and looks close to new. Used containers are graded: cargo-worthy units can still ship goods, while wind & water tight units are retired from shipping but keep the weather out. Our condition grade guide explains the trade-offs.",
  },
  {
    q: "Do I need a foundation?",
    a: "No permanent foundation is needed for storage use. The ground does need to be level and firm — compacted gravel, concrete, asphalt, or blocks or railroad ties at the corners all work. Soft or sloped ground can twist the frame and keep the doors from closing.",
  },
  {
    q: "Do I need a permit?",
    a: "It depends on your city or township, and on whether the container is temporary or permanent. Check with your local zoning or building department — and your HOA, if you have one — before delivery.",
  },
  {
    q: "How much room does the delivery truck need?",
    a: "More than the container. A tilt-bed truck needs a straight approach, enough length to slide the container off, and clear overhead space for the bed to tilt. We confirm the exact requirement for your site when we quote.",
  },
];

export const deliveryFaqs = [
  {
    q: "What kind of truck delivers the container?",
    a: "Containers are typically delivered on a tilt-bed truck or trailer that slides the container off onto the ground. We confirm the equipment and its space requirements with your quote.",
  },
  {
    q: "Can you place the container exactly where I want it?",
    a: "If the truck can reach the spot in a straight line with the clearance it needs, yes. Tell us which way you want the doors to face — that's decided before the container comes off the truck.",
  },
  {
    q: "Do I need to be there on delivery day?",
    a: "We recommend it, or have someone on site who can confirm placement. If no one can be there, mark the spot clearly and include instructions with your quote request.",
  },
  {
    q: "What if the ground is soft or wet?",
    a: "Heavy trucks can sink into soft ground and damage lawns or get stuck. If recent rain or the spring thaw has softened your site, we may recommend waiting or placing the container on a firmer area.",
  },
  {
    q: "Can I move the container later?",
    a: "Yes, with the right equipment. An empty container can be picked up and relocated by a tilt-bed truck. Loaded containers should not be moved this way.",
  },
];
