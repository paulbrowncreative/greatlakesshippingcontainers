import { images, type SiteImage } from "./images";

/**
 * Blog posts. Each post targets one primary search phrase (see docs/STRATEGY.md keyword
 * map) and links to the service/product pages it supports, so articles feed the pages
 * that convert. Inline links use `[text](/path)`; external links open in a new tab.
 *
 * Content rules: general, accurate guidance only. No prices, stock levels, statistics or
 * legal specifics that aren’t verified. Cite authorities (e.g. MDOT) for regulatory facts.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "cta"; title: string; text: string; href: string; label: string };

export const categories = {
  buying: { label: "Buying guides", description: "Sizes, grades and getting a fair price." },
  site: { label: "Site & delivery", description: "Preparing your property and planning delivery." },
  using: { label: "Using containers", description: "Keeping a container dry, secure and useful." },
  renting: { label: "Renting", description: "When renting makes more sense than buying." },
} as const;

export type CategoryId = keyof typeof categories;

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  category: CategoryId;
  primaryKeyword: string;
  secondaryKeywords: string[];
  published: string;
  updated: string;
  image: SiteImage;
  /** Site pages this post supports; those pages list it under "Related reading". */
  supports: string[];
  related: string[];
  body: Block[];
};

const quoteCta: Block = {
  type: "cta",
  title: "Want a delivered price?",
  text: "Tell us the size, your ZIP code and when you need it. We’ll reply with the right unit and one price that includes delivery.",
  href: "/quote",
  label: "Request a Quote",
};

export const posts: BlogPost[] = [
  {
    slug: "shipping-container-cost",
    title: "How much does a shipping container cost? What actually drives the price",
    metaTitle: "How Much Does a Shipping Container Cost? Price Factors Explained",
    description:
      "What drives shipping container prices: size, condition grade, market supply and delivery. How to compare quotes fairly and avoid common pricing traps.",
    excerpt:
      "Two quotes for “a 40-footer” can be far apart and both be fair — or one can be hiding the delivery bill. Here’s what moves the price and how to compare quotes like for like.",
    category: "buying",
    primaryKeyword: "shipping container cost",
    secondaryKeywords: ["shipping container price", "how much is a shipping container", "used shipping container price", "container delivery cost"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.used40Yard,
    supports: ["/services/container-sales", "/containers", "/quote"],
    related: ["new-vs-used-shipping-containers", "rent-vs-buy-shipping-container", "20-ft-vs-40-ft-shipping-container"],
    body: [
      { type: "p", text: "There’s no single price for a shipping container, and any seller who quotes one number without asking where it’s going is leaving something out. The price you actually pay is the container plus getting it to your site — and both halves move." },
      { type: "h2", text: "The five things that set the price" },
      { type: "h3", text: "1. Size" },
      { type: "p", text: "A 40 ft container costs more than a 20 ft one, but rarely twice as much. Because handling and trucking cost about the same for either size, the 40 usually wins on price per square foot. Compare the sizes on our [container sizes page](/containers)." },
      { type: "h3", text: "2. Condition grade" },
      { type: "p", text: "Grade moves the price more than size does. A new one-trip unit costs the most; a cargo-worthy used unit less; a wind & water tight unit less again; an as-is unit least of all. Our [condition grade guide](/containers/condition-grades) explains what each grade really means." },
      { type: "h3", text: "3. Height" },
      { type: "p", text: "A [40 ft high cube](/containers/40-ft-high-cube-containers) adds a foot of height and usually a modest premium over a standard 40." },
      { type: "h3", text: "4. Supply" },
      { type: "p", text: "Container prices follow global shipping. When ocean freight is busy, fewer containers retire into the domestic market and used prices rise; when it slows, supply loosens. That’s why reputable sellers quote current prices rather than publishing a fixed list." },
      { type: "h3", text: "5. Delivery" },
      { type: "p", text: "Distance from the yard, the equipment needed and how easy your site is to reach all affect the delivery cost. A container that’s cheap at the yard can be expensive on your driveway. See [how delivery is planned](/services/delivery)." },
      quoteCta,
      { type: "h2", text: "How to compare two quotes fairly" },
      {
        type: "table",
        caption: "Checklist for comparing container quotes",
        head: ["Ask", "Why it matters"],
        rows: [
          ["Is delivery included?", "A low container price plus a separate delivery bill can cost more than an all-in quote."],
          ["What exact grade is it?", "“Used” covers everything from nearly new to as-is."],
          ["Standard or high cube?", "A 9 ft 6 in unit isn’t the same product as an 8 ft 6 in one."],
          ["What does the truck need on site?", "A failed delivery attempt can add cost and delay."],
          ["Can I see photos of the unit or grade?", "Photos set expectations before it arrives."],
        ],
      },
      { type: "h2", text: "Pricing traps to avoid" },
      {
        type: "ul",
        items: [
          "**Prices without a ZIP code.** If nobody asked where it’s going, delivery isn’t really in the number.",
          "**Vague condition.** “Good condition” isn’t a grade. Ask for one-trip, cargo-worthy, wind & water tight or as-is.",
          "**Pressure to pay by wire before you’ve spoken to anyone.** Online container scams exist. Deal with a seller you can call, whose truck and yard you can see.",
        ],
      },
      { type: "h2", text: "What a complete container quote should include" },
      { type: "ul", items: ["**The exact size and height** — 20 ft or 40 ft, standard (8 ft 6 in) or high cube (9 ft 6 in).", "**The condition grade** — one-trip, cargo-worthy, wind & water tight or as-is.", "**Delivery to your address** — not just “delivery available.”", "**Any site conditions** the price depends on, such as a clear approach or a firm drop spot.", "**Quantity** — multiple units going to the same site are usually planned together.", "**When payment is due** and what it covers."] },
      { type: "h2", text: "How to get an accurate quote the first time" },
      { type: "p", text: "The more a seller knows about your site, the fewer surprises later. When you [request a quote](/quote), include:" },
      { type: "ol", items: ["Your delivery ZIP code (and the address once you are ready to schedule).", "The size, or what you plan to store if you are not sure.", "The grade you want — or what you need it for, so the seller can recommend one.", "When you need it, especially if that is during the spring thaw.", "Anything unusual about access: gates, slopes, overhead wires, soft ground.", "Photos of the drop spot, if you can take them."] },
      { type: "h2", text: "Common questions about container prices" },
      { type: "h3", text: "Why do online prices look lower than quotes?" },
      { type: "p", text: "Advertised prices often exclude delivery, or refer to the lowest grade in a size. Compare the delivered price for the same size and grade." },
      { type: "h3", text: "Is a used container a false economy?" },
      { type: "p", text: "Not if it is the right grade. A wind & water tight unit is built to keep weather out and can give years of storage service. Buy one-trip when appearance, modifications or maximum lifespan matter." },
      { type: "h3", text: "Does buying two containers save money?" },
      { type: "p", text: "It can, because delivery planning is shared. Ask for a quote that covers both units together." },
      { type: "h2", text: "Renting instead?" },
      { type: "p", text: "If you only need storage for a project or a season, renting can cost less overall. Read [rent or buy: how to decide](/blog/rent-vs-buy-shipping-container), or see our [container rentals](/services/container-rentals)." },
    ],
  },
  {
    slug: "rent-vs-buy-shipping-container",
    title: "Rent or buy a shipping container: how to decide",
    metaTitle: "Rent vs Buy a Shipping Container: How to Decide",
    description:
      "Should you rent or buy a storage container? Compare cost over time, flexibility, pickup and resale value to choose the right option for your project.",
    excerpt:
      "Renting wins for projects with an end date. Buying wins when you’ll need the space for the long haul. Here’s how to tell which one you’re in.",
    category: "renting",
    primaryKeyword: "rent vs buy shipping container",
    secondaryKeywords: ["shipping container rental", "storage container rental Michigan", "should I buy or rent a storage container"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.new20,
    supports: ["/services/container-rentals", "/services/container-sales"],
    related: ["shipping-container-cost", "secure-shipping-container-jobsite", "shipping-container-permit-michigan"],
    body: [
      { type: "p", text: "Both options get you the same steel box on your site. The difference is what happens over time — and what happens when you’re done with it." },
      { type: "h2", text: "The short answer" },
      {
        type: "table",
        caption: "Renting vs buying a storage container",
        head: ["", "Rent", "Buy"],
        rows: [
          ["Best for", "Projects with an end date", "Long-term or permanent storage"],
          ["Upfront cost", "Lower", "Higher"],
          ["Cost over time", "Adds up month by month", "Paid once"],
          ["When you’re done", "Picked up", "Yours to keep, move or resell"],
          ["Modifications", "Usually not allowed", "Your choice"],
        ],
      },
      { type: "h2", text: "When renting makes sense" },
      {
        type: "ul",
        items: [
          "**Construction and remodeling** — secure storage for the length of the job, gone when the crew leaves.",
          "**Moves and renovations** — keep belongings on your own driveway instead of across town.",
          "**Seasonal inventory** — extra space for a busy season without owning it year-round.",
          "**Uncertain needs** — when you’re not sure how long you’ll need storage, renting keeps options open.",
        ],
      },
      { type: "h2", text: "When buying makes sense" },
      {
        type: "ul",
        items: [
          "You’ll need the storage for a long time, or indefinitely.",
          "You plan to modify it — shelving, lighting, a man door, insulation.",
          "You want an asset: a well-kept container holds resale value.",
        ],
      },
      { type: "h2", text: "Do the math over your timeline" },
      { type: "p", text: "The tipping point depends on the rental rate, the purchase price, delivery and pickup costs, and how long you’ll really keep it. Ask for both quotes on the same request and compare total cost over your timeline — then add a cushion, because projects run long." },
      { type: "callout", title: "Tip", text: "If there’s a real chance a short project becomes permanent storage, price the purchase too. Paying rent for longer than planned is the most common way renting ends up costing more." },
      { type: "h2", text: "Three common scenarios" },
      { type: "h3", text: "A four-month kitchen remodel" },
      { type: "p", text: "Furniture and appliances need a dry, lockable home until the work is done. The end date is clear, so **renting** fits — the container leaves when the contractors do." },
      { type: "h3", text: "A farm that needs permanent equipment storage" },
      { type: "p", text: "The need is open-ended and the container will sit in the same spot for years. **Buying** makes more sense, and a [40 ft unit](/containers/40-ft-shipping-containers) or [high cube](/containers/40-ft-high-cube-containers) gives room to grow." },
      { type: "h3", text: "A contractor with back-to-back projects" },
      { type: "p", text: "If you need jobsite storage most of the year, owning a container and moving it between sites can beat renting on every job. If projects are occasional, rent per job." },
      { type: "h2", text: "What a rental quote should spell out" },
      { type: "ul", items: ["The rental rate and the billing period.", "Delivery and pickup — whether each is included or priced separately.", "The minimum rental term, if there is one.", "The size and condition of the unit.", "What happens if your project runs long.", "Your responsibilities while it is on site — keeping it accessible, empty for pickup, and the contents insured."] },
      { type: "callout", title: "Insure what is inside", text: "Whether you rent or buy, the container protects your belongings from weather and casual theft — but it is not insurance. Check that your home, farm or business policy covers contents stored on site." },
      { type: "h2", text: "Either way, the site prep is the same" },
      { type: "p", text: "Rented or bought, the container needs a level, firm spot and room for the delivery truck. Run through our [site-prep guide](/blog/preparing-your-site-for-container-delivery) before delivery day." },
      { type: "cta", title: "Get both prices", text: "Choose “Rent a container” or “Buy a container” in the quote form — or mention you’d like both.", href: "/services/container-rentals", label: "See Container Rentals" },
    ],
  },
  {
    slug: "shipping-container-permit-michigan",
    title: "Do you need a permit for a shipping container in Michigan?",
    metaTitle: "Do You Need a Permit for a Shipping Container in Michigan?",
    description:
      "Shipping container rules in Michigan are set locally. Learn who regulates placement, the questions to ask your zoning office, and when HOA rules apply.",
    excerpt:
      "Michigan doesn’t have one statewide rule for storage containers — your city, township or village does. Here’s who to call and exactly what to ask.",
    category: "site",
    primaryKeyword: "shipping container permit Michigan",
    secondaryKeywords: ["storage container zoning", "can I put a shipping container on my property", "container ordinance Michigan township"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.container20,
    supports: ["/services/delivery", "/service-area", "/services/container-rentals"],
    related: ["preparing-your-site-for-container-delivery", "rent-vs-buy-shipping-container", "michigan-frost-laws-container-delivery"],
    body: [
      { type: "p", text: "Whether you can keep a shipping container on your property is decided locally. In Michigan, cities, townships and villages write their own zoning ordinances, and they treat storage containers in very different ways. Some allow them freely on commercial and agricultural land; some allow them temporarily on residential lots; some require a permit or don’t allow them at all." },
      { type: "callout", title: "This isn’t legal advice", text: "Rules change and vary street by street. Your local zoning or building office has the final word — call them before delivery." },
      { type: "h2", text: "Who regulates container placement" },
      {
        type: "ul",
        items: [
          "**Your city, township or village** — zoning rules on where accessory structures and temporary storage units can go, setbacks from property lines, and how long they can stay.",
          "**Your HOA or condo association** — deed restrictions can prohibit containers even where zoning allows them.",
          "**Your landlord or property manager** — on commercial or leased sites, get placement approved in writing.",
        ],
      },
      { type: "h2", text: "Questions to ask your zoning office" },
      {
        type: "ol",
        items: [
          "Are storage containers allowed in my zoning district?",
          "Is a permit required — and does it differ for temporary vs permanent placement?",
          "How long can a temporary container stay?",
          "What setbacks apply from property lines, the street and other buildings?",
          "Are there rules on screening, color or placement in front of the building line?",
          "Does modifying the container (power, doors, insulation) change how it’s classified?",
        ],
      },
      { type: "h2", text: "Temporary vs permanent placement" },
      { type: "p", text: "Many communities treat a container on site for a remodel or move differently from one that stays for good. If your need is short-term, a [container rental](/services/container-rentals) can fit within temporary-use rules more easily." },
      { type: "h2", text: "Farms and commercial properties" },
      { type: "p", text: "Agricultural and industrial zoning is often more permissive, but don’t assume. Commercial sites may also have fire-lane, parking and landscaping requirements that affect where a container can sit." },
      { type: "h2", text: "What to tell the zoning office" },
      { type: "p", text: "You will get a clearer answer if you describe the container the way an inspector would see it:" },
      { type: "ul", items: ["**Size:** 20 ft or 40 ft long, 8 ft wide, 8 ft 6 in or 9 ft 6 in tall.", "**Placement:** where on the lot it will sit, and its distance from property lines and buildings.", "**Duration:** a set number of weeks or months, or permanent.", "**Purpose:** storage only, or any modifications such as power or doors.", "**Zoning:** residential, agricultural, commercial or industrial."] },
      { type: "h2", text: "Requirements you may run into" },
      { type: "p", text: "Every community is different, but local rules commonly address:" },
      { type: "ul", items: ["A maximum number of days a temporary storage unit may stay.", "Setbacks from property lines, streets and other structures.", "Whether a container may sit in a front yard or driveway.", "Screening, fencing or color requirements on visible lots.", "A limit on how many containers one property can have.", "A permit or zoning approval, sometimes with a fee."] },
      { type: "h2", text: "Modified containers and building codes" },
      { type: "p", text: "A container used purely for storage is usually a zoning question. Once you add electrical service, plumbing or anything people will occupy, building codes and building permits typically come into play. Talk to your local building official before you start a conversion." },
      { type: "h2", text: "Keep it in writing" },
      { type: "p", text: "If you get verbal approval, follow up for written confirmation — an email from the zoning office or an HOA approval letter. It protects you if a neighbor complains later." },
      { type: "h2", text: "After you have the green light" },
      { type: "p", text: "Pick a level, firm spot that meets the setbacks and has room for the delivery truck to reach. Our [delivery requirements](/services/delivery) cover clearances and ground prep." },
      quoteCta,
    ],
  },
  {
    slug: "michigan-frost-laws-container-delivery",
    title: "Michigan frost laws: planning a container delivery in spring",
    metaTitle: "Michigan Frost Laws & Spring Container Delivery Timing",
    description:
      "How Michigan’s spring weight restrictions (frost laws) work, who sets them, and how to plan a shipping container delivery around the thaw.",
    excerpt:
      "Every spring, Michigan roads go soft as the frost comes out — and weight limits drop. If you need a container in March or April, here’s how to plan around it.",
    category: "site",
    primaryKeyword: "Michigan frost laws",
    secondaryKeywords: ["Michigan seasonal weight restrictions", "spring weight restrictions Michigan", "container delivery spring"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.deliveryRural,
    supports: ["/services/delivery", "/service-area"],
    related: ["preparing-your-site-for-container-delivery", "shipping-container-permit-michigan", "keep-storage-container-dry"],
    body: [
      { type: "p", text: "As Michigan’s ground thaws each spring, water trapped beneath the pavement weakens the roadbed. To prevent damage, road agencies reduce the weight trucks can carry on many roads until the frost has drained. Drivers call these “frost laws.”" },
      { type: "h2", text: "Who sets the restrictions" },
      {
        type: "ul",
        items: [
          "**State highways:** the Michigan Department of Transportation (MDOT) decides when restrictions start and end, based on measured frost depths, road conditions and forecasts. On routes it designates as “seasonal,” legal axle weights are reduced.",
          "**County roads and city streets:** county road commissions and city public works departments set their own seasonal limits. These often line up with MDOT’s dates but don’t always — and many rural roads are restricted when nearby highways aren’t.",
        ],
      },
      { type: "p", text: "Restrictions typically lift from south to north, so the southern Lower Peninsula usually opens up before northern Michigan and the Upper Peninsula." },
      { type: "h2", text: "What it means for your delivery" },
      {
        type: "ul",
        items: [
          "If the last stretch to your property is a restricted county road, delivery may need to wait until limits lift.",
          "Gravel and seasonal roads are often the most affected.",
          "Soft ground on your property matters too — a loaded truck can rut a thawing yard or get stuck.",
        ],
      },
      { type: "h2", text: "How to plan around the thaw" },
      {
        type: "ol",
        items: [
          "**Order early.** If you need a container in spring, request your quote in winter so delivery can be scheduled before restrictions begin or as soon as they lift.",
          "**Tell us your road.** Mention a gravel or seasonal road in the quote form’s site notes.",
          "**Check your county.** Your county road commission publishes current restrictions and posts signs on restricted roads.",
          "**Have a firm drop spot.** Gravel, concrete or asphalt beats lawn during the thaw.",
        ],
      },
      { type: "h2", text: "All-season vs seasonal routes" },
      { type: "p", text: "MDOT classifies state trunklines on its Truck Operators Map. On routes marked **all-season**, legal axle weights stay the same during the thaw. On **seasonal** routes, MDOT posts reduced axle weights — 25% lower on rigid (concrete) pavement and 35% lower on flexible (asphalt) pavement — and some vehicles are held to lower speeds." },
      { type: "h2", text: "When restrictions happen" },
      { type: "p", text: "There is no fixed calendar. Restrictions start when frost conditions call for them — often in late winter — and stay until the frost has left the roadbed. Timing varies from year to year and from county to county, so a delivery that was possible in early March one year may have to wait until April the next." },
      { type: "h2", text: "Why fall and winter can be a smart time to order" },
      { type: "ul", items: ["Roads are not under spring weight limits.", "Frozen ground is firm for the truck — as long as the route is plowed.", "You will have storage in place before spring projects start."] },
      { type: "p", text: "Plan your base first: a gravel pad or blocks under the corners keep the container level when the ground thaws. See our [site-prep guide](/blog/preparing-your-site-for-container-delivery)." },
      { type: "callout", title: "Where to check", text: "MDOT posts statewide restriction updates on its truckers page. For local roads, check your county road commission’s website or call them." },
      { type: "p", text: "Sources: [MDOT — annual spring weight restrictions (2026 announcement)](https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/02/12/annual-spring-weight-restrictions-begin-tuesday-to-protect-michigans-roads) · [MDOT information for truckers](https://www.michigan.gov/truckers)." },
      quoteCta,
    ],
  },
  {
    slug: "keep-storage-container-dry",
    title: "How to keep a storage container dry: condensation and rust in Michigan",
    metaTitle: "Shipping Container Condensation & Rust: Keep It Dry in Michigan",
    description:
      "Why shipping containers sweat, and how to prevent condensation, mildew and rust through Michigan’s freeze–thaw seasons with venting, airflow and maintenance.",
    excerpt:
      "A watertight container can still get wet inside. Condensation is the usual culprit — and a few simple habits keep it under control.",
    category: "using",
    primaryKeyword: "shipping container condensation",
    secondaryKeywords: ["storage container moisture", "prevent rust shipping container", "container sweating"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.container20,
    supports: ["/containers/condition-grades", "/containers/20-ft-shipping-containers", "/containers/40-ft-shipping-containers"],
    related: ["secure-shipping-container-jobsite", "new-vs-used-shipping-containers", "michigan-frost-laws-container-delivery"],
    body: [
      { type: "p", text: "Steel walls warm and cool quickly. When moist air inside the container meets a cold wall or roof, it condenses — “container rain” that drips onto whatever you’ve stored. Michigan’s big day-to-night temperature swings in spring and fall make it worse." },
      { type: "h2", text: "Where the moisture comes from" },
      {
        type: "ul",
        items: [
          "Humid air trapped when the doors are closed.",
          "Wet items going in — damp equipment, snowy tools, green lumber.",
          "Ground moisture under a container sitting directly on soil.",
          "Snow and water tracked in on boots and pallets.",
        ],
      },
      { type: "h2", text: "Seven ways to keep it dry" },
      {
        type: "ol",
        items: [
          "**Ventilate.** Most containers have small vents; keep them clear. Additional vents can be added if you’ll store moisture-sensitive goods.",
          "**Use moisture absorbers.** Desiccant packs or hanging moisture absorbers pull water out of the air. Replace them as they fill.",
          "**Get things off the floor.** Store on pallets or shelving so air moves underneath.",
          "**Leave a gap from the walls.** A few inches lets air circulate and keeps items from touching cold steel.",
          "**Dry things before storing.** Never put wet equipment or fabrics away damp.",
          "**Keep it level and off the dirt.** Gravel, blocks or ties under the corners reduce ground moisture and help the roof shed water.",
          "**Air it out on dry days.** Opening the doors on a dry, breezy day resets the humidity.",
        ],
      },
      { type: "h2", text: "Signs you have a condensation problem" },
      { type: "ul", items: ["Water droplets on the ceiling on cool mornings.", "A musty smell when you open the doors.", "Mildew on cardboard, wood or fabric.", "Rust spots forming on the inside of the roof."] },
      { type: "h2", text: "Items that need extra protection" },
      { type: "p", text: "Some things should not sit loose in an unheated steel box. Use sealed plastic bins or wrap them, and keep them off the floor:" },
      { type: "ul", items: ["Paper records and books.", "Upholstered furniture and mattresses.", "Clothing and textiles.", "Electronics.", "Anything that rusts or tarnishes easily."] },
      { type: "h2", text: "Insulation for long-term or sensitive storage" },
      { type: "p", text: "If you will store moisture-sensitive goods year-round, insulating the walls and ceiling reduces condensation by keeping the inner surface closer to air temperature. It is a bigger project — and it uses interior height, which is one reason buyers who plan to insulate often choose a [high cube](/blog/high-cube-vs-standard-container)." },
      { type: "h2", text: "Stopping rust before it spreads" },
      {
        type: "ul",
        items: [
          "Clear snow and standing water off the roof — dents that hold water are where roof rust starts.",
          "Touch up scratches and surface rust with a rust-converting primer and exterior paint.",
          "Check door gaskets each season; replace torn sections to keep driving rain out.",
        ],
      },
      { type: "callout", title: "Choosing the right grade helps", text: "A new or cargo-worthy container starts with better paint and seals. For long-term storage of sensitive goods, it can be worth the step up — see our condition grade guide." },
      { type: "p", text: "Read the [condition grade guide](/containers/condition-grades), or ask us which grade suits what you’re storing." },
      quoteCta,
      { type: "h2", text: "A seasonal checklist" },
      { type: "table", caption: "Seasonal maintenance for a storage container in Michigan", head: ["Season", "Check"], rows: [["Spring", "Clear debris from the roof, check door gaskets, air it out on dry days, re-level if the ground shifted over winter."], ["Summer", "Look for new scratches or rust spots and touch them up while it is warm and dry."], ["Fall", "Replace moisture absorbers, clear leaves from the roof, lubricate door hinges and lock rods."], ["Winter", "Keep heavy snow off the roof and the area in front of the doors clear."]] },
    ],
  },
  {
    slug: "secure-shipping-container-jobsite",
    title: "How to secure a shipping container on a jobsite",
    metaTitle: "How to Secure a Shipping Container: Jobsite Security Guide",
    description:
      "Practical ways to secure a shipping container: lock boxes, puck locks, placement, lighting and inventory habits that deter theft on jobsites and farms.",
    excerpt:
      "A steel container is already tough to break into. The weak point is almost always the lock — here’s how to fix that and make your container a harder target.",
    category: "using",
    primaryKeyword: "shipping container security",
    secondaryKeywords: ["jobsite storage container", "container lock box", "construction site storage security"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.usedStack,
    supports: ["/uses", "/containers/20-ft-shipping-containers", "/services/container-rentals"],
    related: ["keep-storage-container-dry", "rent-vs-buy-shipping-container", "20-ft-vs-40-ft-shipping-container"],
    body: [
      { type: "p", text: "Contractors use containers because they’re far harder to break into than a trailer or a shed. But thieves go for the easiest point, and on a container that’s the padlock. Get the lock right and you’ve done most of the work." },
      { type: "h2", text: "1. Use a lock box" },
      { type: "p", text: "A lock box is a steel shroud welded around the door handles. It covers the padlock’s shackle so bolt cutters and pry bars can’t get a grip. Many containers have one; if yours doesn’t, one can be welded on." },
      { type: "h2", text: "2. Choose a shrouded or puck lock" },
      { type: "p", text: "A round “puck” or disc padlock hides its shackle almost entirely and fits neatly inside a lock box. Avoid long-shackle padlocks — the exposed steel is exactly what cutters need." },
      { type: "h2", text: "3. Place it smart" },
      {
        type: "ul",
        items: [
          "Face the doors toward an occupied area, a road or the site office — somewhere a thief would be seen.",
          "Or face the doors toward a wall or another container with just enough room to open them, making access awkward.",
          "Keep it inside fencing where possible.",
        ],
      },
      { type: "h2", text: "4. Add light and eyes" },
      { type: "p", text: "A motion-activated light over the doors and a visible camera are cheap deterrents. Battery and solar options work on sites without power." },
      { type: "h2", text: "5. Keep an inventory" },
      { type: "p", text: "Photograph serial numbers and keep a list of what’s inside. It helps with insurance claims and with recovering stolen equipment." },
      { type: "h2", text: "6. Secure what is inside" },
      { type: "ul", items: ["Chain high-value equipment to the container’s lashing rings.", "Keep small, expensive tools in a locked gang box inside the container.", "Avoid stacking boxes in a way that advertises what is inside when the doors open."] },
      { type: "h2", text: "7. Check your insurance" },
      { type: "p", text: "A container protects your equipment from casual theft and weather, but your insurance is what covers a loss. Confirm your policy covers tools and materials stored on site — and whether it requires specific locks." },
      { type: "h2", text: "If it happens anyway" },
      { type: "ol", items: ["Do not touch anything — photograph the damage and the contents first.", "Report it to the police and get a report number.", "Use your inventory and serial numbers for the claim.", "Upgrade whatever failed: lock, lock box, lighting or placement."] },
      { type: "h2", text: "A quick security checklist" },
      { type: "ul", items: ["Lock box fitted, with a puck or shrouded lock.", "Doors facing an occupied or visible area.", "Motion light and a visible camera.", "High-value items chained or boxed.", "Inventory with serial numbers kept off site."] },
      { type: "h2", text: "Pick the right size for the site" },
      { type: "p", text: "A [20 ft container](/containers/20-ft-shipping-containers) fits tight urban and residential jobsites; a [40 ft unit](/containers/40-ft-shipping-containers) holds a whole crew’s tools and materials. For a single project, consider a [container rental](/services/container-rentals)." },
      quoteCta,
    ],
  },
  {
    slug: "high-cube-vs-standard-container",
    title: "High cube vs standard shipping containers: is the extra foot worth it?",
    metaTitle: "High Cube vs Standard Shipping Container: Differences & Uses",
    description:
      "High cube vs standard containers compared: height, door opening, volume and weight, plus when the extra foot of a 9'6\" high cube is worth paying for.",
    excerpt:
      "A high cube is a foot taller than a standard container. Sometimes that foot is essential; sometimes it’s money you don’t need to spend.",
    category: "buying",
    primaryKeyword: "high cube vs standard container",
    secondaryKeywords: ["40 ft high cube container", "high cube container dimensions", "9'6\" container"],
    published: "2026-10-17",
    updated: "2026-10-17",
    image: images.highCube,
    supports: ["/containers/40-ft-high-cube-containers", "/containers/40-ft-shipping-containers", "/containers"],
    related: ["20-ft-vs-40-ft-shipping-container", "shipping-container-cost", "new-vs-used-shipping-containers"],
    body: [
      { type: "p", text: "Standard containers are 8 ft 6 in tall on the outside. High cubes are 9 ft 6 in. Footprint, width and length are the same — the only difference is height." },
      { type: "h2", text: "Side by side (40 ft units)" },
      {
        type: "table",
        caption: "Typical figures; individual units vary slightly by manufacturer",
        head: ["", "40 ft standard", "40 ft high cube"],
        rows: [
          ["Outside height", "8 ft 6 in", "9 ft 6 in"],
          ["Inside height", "≈ 7 ft 10 in", "≈ 8 ft 10 in"],
          ["Door opening height", "≈ 7 ft 6 in", "≈ 8 ft 5 in"],
          ["Volume", "≈ 2,390 cu ft", "≈ 2,690 cu ft"],
          ["Empty weight", "≈ 8,000–8,500 lb", "≈ 8,500–8,900 lb"],
        ],
      },
      { type: "h2", text: "When the extra foot is worth it" },
      {
        type: "ul",
        items: [
          "**Tall equipment** that won’t clear a 7 ft 6 in door.",
          "**Shelving or racking** where an extra tier pays for itself.",
          "**Conversions** — insulation, lighting and ductwork eat headroom fast.",
          "**Bulky, light goods** where you run out of space before weight.",
        ],
      },
      { type: "h2", text: "When a standard is fine" },
      { type: "p", text: "Pallets, boxes, tools and most household goods stack well under 7 ft. If nothing you store is tall, a standard 40 does the same job and usually costs a little less." },
      { type: "h2", text: "How to tell them apart at a glance" },
      { type: "p", text: "Every container carries an ISO size and type code painted near the container number on the doors. The first two characters describe length and height:" },
      { type: "table", caption: "Common ISO size-type codes on dry containers", head: ["Code", "Container"], rows: [["22G1", "20 ft standard (8 ft 6 in tall)"], ["25G1", "20 ft high cube (9 ft 6 in tall)"], ["42G1", "40 ft standard (8 ft 6 in tall)"], ["45G1", "40 ft high cube (9 ft 6 in tall)"]] },
      { type: "p", text: "High cubes also usually carry a yellow-and-black hazard stripe along the top edge and a “9′6″ high” caution label, warning drivers and crane operators of the extra height." },
      { type: "h2", text: "What about a 20 ft high cube?" },
      { type: "p", text: "They exist, but they are less common than 40 ft high cubes. If you need the height in a smaller footprint, ask — choose “20 ft high cube” in the [quote form](/quote)." },
      { type: "h2", text: "Planning for shelving and conversions" },
      { type: "p", text: "Shelving, insulation and lighting all take up height. In a standard container, a layer of ceiling insulation brings the roof uncomfortably close for many people. A high cube keeps usable standing room after the build-out, which is why it is the usual starting point for workshops and offices." },
      { type: "h2", text: "Delivery considerations" },
      { type: "p", text: "A high cube sits a foot taller on the trailer, so check overhead clearance along the route and at the drop spot — wires, branches and carports. See [delivery requirements](/services/delivery)." },
      { type: "p", text: "Compare full specs: [40 ft high cube](/containers/40-ft-high-cube-containers) · [40 ft standard](/containers/40-ft-shipping-containers)." },
      quoteCta,
      { type: "h2", text: "The bottom line" },
      { type: "p", text: "Buy height only if you will use it. If anything you store is taller than about 7 ft 6 in, or you plan shelving or a conversion, the high cube pays for itself. Otherwise a standard 40 is the efficient choice. Not sure? Try the [size chooser](/containers#size-chooser)." },
    ],
  },
  {
    slug: "20-ft-vs-40-ft-shipping-container",
    title: "20 ft vs 40 ft shipping container: which should you buy?",
    metaTitle: "20 ft vs 40 ft Shipping Container: Which Size Should You Buy?",
    description:
      "Compare 20 ft and 40 ft shipping containers on space, cost per square foot, delivery room and site fit — with a simple way to decide.",
    excerpt: "Most buyers end up choosing between the two standard sizes. Here’s how floor space, cost per square foot and your site decide it.",
    category: "buying",
    primaryKeyword: "20ft vs 40ft container",
    secondaryKeywords: ["shipping container sizes", "20 ft container dimensions", "40 ft container dimensions"],
    published: "2026-10-16",
    updated: "2026-10-17",
    image: images.used40Yard,
    supports: ["/containers", "/containers/20-ft-shipping-containers", "/containers/40-ft-shipping-containers"],
    related: ["high-cube-vs-standard-container", "shipping-container-cost", "preparing-your-site-for-container-delivery"],
    body: [
      { type: "p", text: "Most buyers end up choosing between the two standard sizes. The right answer usually comes down to three things: how much you’re storing, how much room you have for delivery, and cost per square foot." },
      { type: "h2", text: "The quick comparison" },
      {
        type: "table",
        caption: "Typical figures; exact dimensions vary slightly by manufacturer",
        head: ["", "20 ft standard", "40 ft standard"],
        rows: [
          ["Floor space (inside)", "≈ 150 sq ft", "≈ 300 sq ft"],
          ["Volume", "≈ 1,170 cu ft", "≈ 2,390 cu ft"],
          ["Standard pallets on the floor", "≈ 10", "≈ 20"],
          ["Pad needed", "20 × 8 ft", "40 × 8 ft"],
        ],
      },
      { type: "h2", text: "Choose a 20 ft container when…" },
      {
        type: "ul",
        items: [
          "Your site is a driveway, alley-access lot or tight jobsite.",
          "You’re storing up to about 10 pallets — tools, materials or household goods.",
          "You may move it again, and want the easiest unit to relocate.",
        ],
      },
      { type: "h2", text: "Choose a 40 ft container when…" },
      {
        type: "ul",
        items: [
          "You have an open yard, farm or commercial lot with room for the truck and trailer.",
          "You need more than about 10 pallets’ worth of space, now or later.",
          "Cost per square foot matters more than total price.",
        ],
      },
      { type: "h2", text: "Why a 40 often costs less per square foot" },
      { type: "p", text: "A 40 ft container doesn’t usually cost twice as much as a 20. The handling and trucking involved in delivering either size are similar, so the delivered price per square foot is typically lower on the 40. More on what drives price in [how much does a shipping container cost](/blog/shipping-container-cost)." },
      quoteCta,
      { type: "h2", text: "Which size different customers usually choose" },
      { type: "table", caption: "Typical size by use", head: ["Customer", "Usual choice", "Why"], rows: [["Homeowner (move or remodel)", "20 ft", "Fits a driveway; enough for most household contents"], ["Contractor (single trade)", "20 ft", "Fits tight jobsites near the work"], ["Contractor (multi-trade, long project)", "40 ft", "Room for a whole crew’s tools and materials"], ["Farm", "40 ft or 40 ft high cube", "Open land; equipment and bulk supplies"], ["Retail or warehouse overflow", "40 ft", "Most pallets per delivery"]] },
      { type: "p", text: "See more examples on our [container uses page](/uses)." },
      { type: "h2", text: "Think about moving it later" },
      { type: "p", text: "If the container may need to move between jobsites or properties, a 20 is easier to place on tight sites. A 40 needs more room every time it is delivered." },
      { type: "h2", text: "What about two 20s instead of one 40?" },
      { type: "p", text: "Two 20 ft units give the same floor space as a 40, with doors at both locations, and can fit an L-shaped or split site. The trade-off is two units to place and two pads to prepare." },
      { type: "h2", text: "Need height? Look at a high cube" },
      { type: "p", text: "A [40 ft high cube](/containers/40-ft-high-cube-containers) is one foot taller (9 ft 6 in outside) with a door opening of about 8 ft 5 in. Compare in [high cube vs standard](/blog/high-cube-vs-standard-container)." },
      { type: "p", text: "Still unsure? Try the [size chooser](/containers#size-chooser)." },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "Will a 40 ft container fit on a residential lot?" },
      { type: "p", text: "Sometimes. The container needs a 40 × 8 ft level spot, and the truck and trailer need room to reach it. Local rules may also limit containers on residential lots — see [permits in Michigan](/blog/shipping-container-permit-michigan)." },
      { type: "h3", text: "Can I stack containers?" },
      { type: "p", text: "Containers are designed to stack at their corner castings, but stacking on a customer site needs suitable equipment and a solid, level base. Ask before planning it." },
    ],
  },
  {
    slug: "preparing-your-site-for-container-delivery",
    title: "How to prepare your site for shipping container delivery",
    metaTitle: "How to Prepare Your Site for Shipping Container Delivery",
    description:
      "A practical checklist for container delivery: base and leveling, truck access and clearance, door orientation, permits and Michigan seasonal issues.",
    excerpt:
      "A few hours of preparation prevents the two most common delivery problems: a truck that can’t reach the spot, and a container that won’t sit level.",
    category: "site",
    primaryKeyword: "shipping container site preparation",
    secondaryKeywords: ["shipping container foundation", "container delivery requirements", "what to put under a shipping container"],
    published: "2026-10-16",
    updated: "2026-10-17",
    image: images.deliveryRural,
    supports: ["/services/delivery", "/service-area"],
    related: ["michigan-frost-laws-container-delivery", "shipping-container-permit-michigan", "keep-storage-container-dry"],
    body: [
      { type: "p", text: "A container is only as useful as where it ends up. A few hours of preparation prevents the two most common delivery problems: a truck that can’t reach the spot, and a container that settles out of level so its doors won’t close." },
      { type: "h2", text: "1. Choose the spot" },
      {
        type: "ul",
        items: [
          "Pick level ground with good drainage — not the low corner where water collects.",
          "Leave several feet in front of the doors so both swing fully open.",
          "Stay clear of septic tanks and drain fields, buried utilities and property lines (check setback rules).",
          "Decide which way the doors should face before delivery day.",
        ],
      },
      { type: "h2", text: "2. Prepare a level, firm base" },
      { type: "p", text: "Containers carry their weight on four corner castings. The ground under those corners needs to be firm and level so the frame stays square." },
      {
        type: "table",
        caption: "Common bases for a shipping container",
        head: ["Base", "Good for", "Notes"],
        rows: [
          ["Concrete or asphalt", "Commercial lots, driveways", "Ideal if already level"],
          ["Compacted gravel pad", "Farms, yards, long-term use", "Drains well; resists frost heave"],
          ["Blocks or railroad ties", "Soil sites", "Under each corner; keeps the floor off wet ground"],
          ["Bare grass or dirt", "Short-term only", "Can settle unevenly as ground softens"],
        ],
      },
      { type: "h2", text: "3. Check truck access" },
      { type: "p", text: "Containers arrive on a truck or truck-and-trailer that is far longer than the container itself. We deliver with our own pickup and gooseneck trailer — with a 40 ft container aboard, that rig is well over 60 ft long. Check:" },
      {
        type: "ul",
        items: [
          "**Length:** room for the whole rig to pull in, position beside the spot and get back out.",
          "**Width:** at least 12 ft along the route, including gates.",
          "**Overhead:** about 14 ft clear along the route and at the drop spot. Look for power lines, branches and eaves.",
          "**Ground:** firm enough for a heavy truck. Avoid soft lawns after rain.",
        ],
      },
      quoteCta,
      { type: "h3", text: "Leveling the corners" },
      { type: "p", text: "Check level along both the length and the width. Use solid concrete blocks, pavers or treated timbers under the corner castings — not loose scraps of wood that will rot or shift. On a slope, build up the low end rather than digging into the high end." },
      { type: "h3", text: "Planning door direction" },
      { type: "ul", items: ["Face the doors where you will load from — a driveway, a work area or a building entrance.", "Avoid facing doors into prevailing wind and drifting snow if you can.", "Leave room for both doors to swing fully open, about the width of the container in front of it."] },
      { type: "h2", text: "4. Confirm the rules" },
      { type: "p", text: "Many Michigan cities and townships regulate where containers can sit and for how long. Read [do you need a permit for a shipping container in Michigan?](/blog/shipping-container-permit-michigan) before you order." },
      { type: "h2", text: "5. Plan around the season" },
      {
        type: "ul",
        items: [
          "**Spring:** many roads have seasonal weight restrictions during the thaw — see [Michigan frost laws](/blog/michigan-frost-laws-container-delivery).",
          "**Winter:** have the route and drop spot plowed. A gravel or blocked base prevents settling when the ground thaws.",
          "**After heavy rain:** soft ground can rut or trap a truck. Rescheduling a day or two is better than getting stuck.",
        ],
      },
      { type: "h2", text: "6. On delivery day" },
      { type: "p", text: "Mark the spot clearly, move vehicles and equipment out of the path, and have someone on site who can confirm placement and door direction. Full details on our [delivery & placement page](/services/delivery)." },
    ],
  },
  {
    slug: "new-vs-used-shipping-containers",
    title: "New vs used shipping containers: what you actually get",
    metaTitle: "New vs Used Shipping Containers: Which Is Right for You?",
    description:
      "One-trip, cargo-worthy or wind & water tight? How new and used shipping containers differ in condition, lifespan and value, and how to choose a grade.",
    excerpt:
      "“Used” covers everything from a nearly new box to one that’s seen fifteen years at sea. Knowing the grade matters more than the word.",
    category: "buying",
    primaryKeyword: "new vs used shipping containers",
    secondaryKeywords: ["one trip container", "cargo worthy container", "wind and water tight container", "used shipping containers Michigan"],
    published: "2026-10-16",
    updated: "2026-10-17",
    image: images.usedStack,
    supports: ["/containers/condition-grades", "/services/container-sales"],
    related: ["shipping-container-cost", "keep-storage-container-dry", "high-cube-vs-standard-container"],
    body: [
      { type: "p", text: "“Used” covers a wide range — from a nearly new box with a few scuffs to a well-traveled unit that’s seen fifteen years at sea. Knowing the grade matters more than the word new or used." },
      { type: "h2", text: "New (one-trip) containers" },
      { type: "p", text: "Built recently and shipped loaded once, usually from the factory overseas. Expect uniform paint, tight door seals and few dents. Pick one-trip when the container will be visible to customers, when you plan to modify it, or when you want the longest service life." },
      { type: "h2", text: "Used containers" },
      { type: "h3", text: "Cargo-worthy (CW)" },
      { type: "p", text: "Still structurally fit to carry cargo at sea. Expect dents, patches and surface rust, but sound structure, floor and doors." },
      { type: "h3", text: "Wind & water tight (WWT)" },
      { type: "p", text: "Retired from shipping but sealed against weather. The most popular grade for on-site storage because it does the job at the lowest price." },
      { type: "h3", text: "As-is" },
      { type: "p", text: "Sold with known problems. Only worth it for parts, projects that replace panels anyway, or storage where leaks don’t matter." },
      { type: "h2", text: "How to choose" },
      {
        type: "table",
        caption: "Matching a condition grade to your project",
        head: ["If you need…", "Consider"],
        rows: [
          ["Low-cost, dry storage on your own site", "Wind & water tight"],
          ["Storage now, possible shipping or resale later", "Cargo-worthy"],
          ["A clean look, a conversion or maximum lifespan", "New / one-trip"],
          ["Steel for a build project", "As-is"],
        ],
      },
      quoteCta,
      { type: "h2", text: "How to read a container’s markings" },
      { type: "ul", items: ["**Container number** (four letters plus seven digits) — identifies the unit.", "**ISO size-type code** (for example 22G1 or 45G1) — tells you the length and height. See [high cube vs standard](/blog/high-cube-vs-standard-container).", "**CSC safety approval plate** — a metal plate on the door showing manufacture date, maximum gross weight and tare (empty) weight.", "**Max gross, tare and payload** — also painted on the doors."] },
      { type: "p", text: "The manufacture date on the CSC plate is a quick way to tell a young container from an older one, whatever its paint looks like." },
      { type: "h2", text: "Lifespan and resale" },
      { type: "p", text: "A well-kept container lasts many years in on-site storage. New and cargo-worthy units hold resale value best; wind & water tight units are usually bought to be used rather than resold. Keeping it level, painted and clear of standing water protects whichever you buy — see [keeping a container dry](/blog/keep-storage-container-dry)." },
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
      { type: "p", text: "Compare all grades in our [condition grade guide](/containers/condition-grades), and see [what drives container prices](/blog/shipping-container-cost)." },
      { type: "h2", text: "When it arrives" },
      { type: "p", text: "Open and close both doors, check the gaskets, and step inside with the doors shut to look for daylight. Our [condition grade guide](/containers/condition-grades) has a full inspection checklist." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postsNewestFirst = () => [...posts].sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

export const postsSupporting = (path: string, limit = 3) => postsNewestFirst().filter((p) => p.supports.includes(path)).slice(0, limit);

/** Plain text of a post (inline link and bold markup stripped), for word counts and feeds. */
export function postText(p: BlogPost): string {
  const strip = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
  return p.body
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.map(strip).join(" ");
      if (b.type === "table") return [...b.head, ...b.rows.flat()].join(" ");
      if (b.type === "callout" || b.type === "cta") return `${b.title} ${b.text}`;
      return strip(b.text);
    })
    .join(" ");
}

export const wordCount = (p: BlogPost) => postText(p).split(/\s+/).filter(Boolean).length;
export const readingMinutes = (p: BlogPost) => Math.max(2, Math.round(wordCount(p) / 220));

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
