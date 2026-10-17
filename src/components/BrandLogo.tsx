import Image from "next/image";

/**
 * Official Great Lakes Shipping Containers logo (horizontal lockup, traced to vector from
 * the owner-supplied master artwork). Served as a cached SVG file rather than inlined.
 */
export function BrandLogo() {
  return (
    <Image
      className="brand__logo"
      src="/brand/logo-horizontal-on-dark.svg"
      alt=""
      width={2567}
      height={455}
      loading="eager"
      unoptimized
    />
  );
}
