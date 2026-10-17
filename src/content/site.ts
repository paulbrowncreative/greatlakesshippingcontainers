export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://glsc-mi.com").replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: { label: string; href: string; children?: NavItem[] }[] = [
  {
    label: "Containers",
    href: "/containers",
    children: [
      { label: "20 ft Containers", href: "/containers/20-ft-shipping-containers", description: "Compact footprint, 1,170 cu ft" },
      { label: "40 ft Standard", href: "/containers/40-ft-shipping-containers", description: "Double the floor space" },
      { label: "40 ft High Cube", href: "/containers/40-ft-high-cube-containers", description: "An extra foot of height" },
      { label: "Condition Grades", href: "/containers/condition-grades", description: "New, cargo-worthy, wind & water tight" },
      { label: "All Containers", href: "/containers", description: "Compare sizes side by side" },
    ],
  },
  {
    label: "Services",
    href: "/services/container-sales",
    children: [
      { label: "Container Sales", href: "/services/container-sales", description: "Buy a container outright" },
      { label: "Container Rentals", href: "/services/container-rentals", description: "Storage for a project or season" },
      { label: "Delivery & Placement", href: "/services/delivery", description: "How delivery is planned and quoted" },
    ],
  },
  { label: "Uses", href: "/uses" },
  { label: "Service Area", href: "/service-area" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  containers: [
    { label: "20 ft Shipping Containers", href: "/containers/20-ft-shipping-containers" },
    { label: "40 ft Shipping Containers", href: "/containers/40-ft-shipping-containers" },
    { label: "40 ft High Cube Containers", href: "/containers/40-ft-high-cube-containers" },
    { label: "Condition Grades Explained", href: "/containers/condition-grades" },
    { label: "Compare All Sizes", href: "/containers" },
  ],
  company: [
    { label: "Container Sales", href: "/services/container-sales" },
    { label: "Container Rentals", href: "/services/container-rentals" },
    { label: "Delivery & Placement", href: "/services/delivery" },
    { label: "Container Uses", href: "/uses" },
    { label: "Service Area", href: "/service-area" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Photo Credits", href: "/photo-credits" },
  ],
};
