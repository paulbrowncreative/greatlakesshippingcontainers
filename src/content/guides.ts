import { images, type SiteImage } from "./images";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "link"; text: string; href: string };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  published: string;
  updated: string;
  readMinutes: number;
  image: SiteImage;
  body: Block[];
  related: { label: string; href: string }[];
};

export const guides: Guide[] = [
  {
    slug: "20-ft-vs-40-ft-shipping-container",
    title: "20 ft vs 40 ft shipping container: which should you buy?",
    metaTitle: "20 ft vs 40 ft Shipping Container: Which Size Should You Buy?",
    description:
      "Compare 20 ft and 40 ft shipping containers on space, cost per square foot, delivery room and site fit — with a simple way to decide.",
    published: "2026-10-16",
    updated: "2026-10-16",
    readMinutes: 5,
    image: images.used40Yard,
    body: [
      { type: "p", text: "Most buyers end up choosing between the two standard sizes. The right answer usually comes down to three things: how much you're storing, how much room you have for delivery, and cost per square foot." },
      { type: "h2", text: "The quick comparison" },
      {
        type: "table",
        head: ["", "20 ft standard", "40 ft standard"],
        rows: [
          ["Floor space (inside)", "≈ 150 sq ft", "≈ 300 sq ft"],
          ["Volume", "≈ 1,170 cu ft", "≈ 2,390 cu ft"],
          ["Standard pallets on the floor", "≈ 10", "≈ 20"],
          ["Pad needed", "20 × 8 ft", "40 × 8 ft"],
        ],
      },
      { type: "p", text: "Figures are typical; exact dimensions vary slightly by manufacturer, and delivery requirements depend on the truck." },
      { type: "h2", text: "Choose a 20 ft container when…" },
      {
        type: "ul",
        items: [
          "Your site is a driveway, alley-access lot or tight jobsite.",
          "You're storing up to about 10 pallets — tools, materials or household goods.",
          "You may move it again, and want the easiest unit to relocate.",
        ],
      },
      { type: "h2", text: "Choose a 40 ft container when…" },
      {
        type: "ul",
        items: [
          "You have an open yard, farm or commercial lot with room for the truck.",
          "You need more than about 10 pallets' worth of space, now or later.",
          "Cost per square foot matters more than total price.",
        ],
      },
      { type: "h2", text: "Why a 40 often costs less per square foot" },
      { type: "p", text: "A 40 ft container doesn't usually cost twice as much as a 20. The handling and trucking involved in delivering either size are similar, so the delivered price per square foot of storage is typically lower on the 40. If you're on the fence and your site can take it, ask for both sizes on the same quote." },
      { type: "h2", text: "What about two 20s instead of one 40?" },
      { type: "p", text: "Two 20 ft units give the same floor space as a 40 with doors at both locations, and they can fit an L-shaped or split site. The trade-off is two deliveries' worth of handling and two pads to prepare." },
      { type: "h2", text: "Need height? Look at a high cube" },
      { type: "p", text: "A 40 ft high cube is one foot taller (9 ft 6 in outside) with a door opening of about 8 ft 5 in — useful for tall equipment, shelving and conversions." },
      { type: "link", text: "See 40 ft high cube specs", href: "/containers/40-ft-high-cube-containers" },
    ],
    related: [
      { label: "20 ft container specs", href: "/containers/20-ft-shipping-containers" },
      { label: "40 ft container specs", href: "/containers/40-ft-shipping-containers" },
      { label: "Container size chooser", href: "/containers#size-chooser" },
    ],
  },
  {
    slug: "preparing-your-site-for-container-delivery",
    title: "How to prepare your site for shipping container delivery",
    metaTitle: "How to Prepare Your Site for Shipping Container Delivery",
    description:
      "A practical checklist for container delivery: base and leveling, truck access and clearance, door orientation, permits and Michigan seasonal issues.",
    published: "2026-10-16",
    updated: "2026-10-16",
    readMinutes: 6,
    image: images.deliveryRural,
    body: [
      { type: "p", text: "A container is only as useful as where it ends up. A few hours of preparation prevents the two most common delivery problems: a truck that can't reach the spot, and a container that settles out of level so its doors won't close." },
      { type: "h2", text: "1. Choose the spot" },
      {
        type: "ul",
        items: [
          "Pick level ground with good drainage — not the low corner where water collects.",
          "Leave several feet in front of the doors so both swing fully open.",
          "Stay clear of septic tanks and drain fields, buried utilities and property lines (check setback rules).",
          "Decide which way the doors should face. That's set when the container comes off the truck.",
        ],
      },
      { type: "h2", text: "2. Prepare a level, firm base" },
      { type: "p", text: "Containers carry their weight on four corner castings. The ground under those corners needs to be firm and level so the frame stays square." },
      {
        type: "table",
        head: ["Base", "Good for", "Notes"],
        rows: [
          ["Concrete or asphalt", "Commercial lots, driveways", "Ideal if already level"],
          ["Compacted gravel pad", "Farms, yards, long-term use", "Drains well; resists frost heave"],
          ["Blocks or railroad ties", "Soil sites", "Under each corner; keeps the floor off wet ground"],
          ["Bare grass or dirt", "Short-term only", "Can settle unevenly as ground softens"],
        ],
      },
      { type: "h2", text: "3. Check truck access" },
      { type: "p", text: "Containers arrive on a truck or truck-and-trailer that is far longer than the container itself, and the unloading method depends on the supplier's equipment. Ask how yours will be unloaded, then check:" },
      {
        type: "ul",
        items: [
          "Length: room for the whole rig to pull in, position beside the spot and get back out. A pickup and gooseneck trailer carrying a 40 ft container is well over 60 ft long.",
          "Width: at least 12 ft along the route, including gates.",
          "Overhead: about 14 ft clear along the route and at the drop spot. Look for power lines, branches and eaves.",
          "Ground: firm enough for a heavy truck. Avoid soft lawns after rain.",
        ],
      },
      { type: "h2", text: "4. Confirm the rules" },
      { type: "p", text: "Many Michigan cities and townships regulate where containers can sit, for how long, and whether a permit is needed. HOAs and landlords may add their own rules. A quick call to your local zoning office before delivery avoids a removal notice afterward." },
      { type: "h2", text: "5. Plan around the season" },
      {
        type: "ul",
        items: [
          "Spring: many Michigan roads have seasonal weight restrictions (frost laws) during the thaw. Order early if you need delivery in March or April.",
          "Winter: have the route and drop spot plowed. Frozen ground is firm, but a gravel or blocked base prevents settling when it thaws.",
          "After heavy rain: soft ground can rut or trap a truck. Rescheduling a day or two is better than a stuck truck.",
        ],
      },
      { type: "h2", text: "6. On delivery day" },
      { type: "p", text: "Mark the spot clearly, move vehicles and equipment out of the path, and have someone on site who can confirm placement and door direction." },
      { type: "link", text: "Read our delivery requirements", href: "/services/delivery" },
    ],
    related: [
      { label: "Delivery & placement", href: "/services/delivery" },
      { label: "Container condition grades", href: "/containers/condition-grades" },
      { label: "Request a delivered quote", href: "/quote" },
    ],
  },
  {
    slug: "new-vs-used-shipping-containers",
    title: "New vs used shipping containers: what you actually get",
    metaTitle: "New vs Used Shipping Containers: Which Is Right for You?",
    description:
      "One-trip, cargo-worthy or wind & water tight? How new and used shipping containers differ in condition, lifespan and value, and how to pick the right grade.",
    published: "2026-10-16",
    updated: "2026-10-16",
    readMinutes: 4,
    image: images.usedStack,
    body: [
      { type: "p", text: "“Used” covers a wide range — from a nearly new box with a few scuffs to a well-traveled unit that's seen fifteen years at sea. Knowing the grade matters more than the word new or used." },
      { type: "h2", text: "New (one-trip) containers" },
      { type: "p", text: "Built recently and shipped loaded once, usually from the factory overseas. Expect uniform paint, tight door seals and few dents. Pick one-trip when the container will be visible to customers, when you plan to modify it, or when you want the longest service life." },
      { type: "h2", text: "Used containers" },
      { type: "h3", text: "Cargo-worthy (CW)" },
      { type: "p", text: "Still structurally fit to carry cargo at sea. Expect dents, patches and surface rust, but sound structure, floor and doors." },
      { type: "h3", text: "Wind & water tight (WWT)" },
      { type: "p", text: "Retired from shipping but sealed against weather. The most popular grade for on-site storage because it does the job at the lowest price." },
      { type: "h3", text: "As-is" },
      { type: "p", text: "Sold with known problems. Only worth it for parts, projects that replace panels anyway, or storage where leaks don't matter." },
      { type: "h2", text: "How to choose" },
      {
        type: "table",
        head: ["If you need…", "Consider"],
        rows: [
          ["Low-cost, dry storage on your own site", "Wind & water tight"],
          ["Storage now, possible shipping or resale later", "Cargo-worthy"],
          ["A clean look, a conversion or maximum lifespan", "New / one-trip"],
          ["Steel for a build project", "As-is"],
        ],
      },
      { type: "h2", text: "Questions to ask any seller" },
      {
        type: "ul",
        items: [
          "What exact grade is this unit?",
          "Can I see photos of the actual container or the typical condition?",
          "Is delivery included in the price?",
          "What does the delivery truck need on my site?",
        ],
      },
      { type: "link", text: "Compare all condition grades", href: "/containers/condition-grades" },
    ],
    related: [
      { label: "Condition grades explained", href: "/containers/condition-grades" },
      { label: "Container sales", href: "/services/container-sales" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
