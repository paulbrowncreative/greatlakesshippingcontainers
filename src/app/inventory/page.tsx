import Link from "next/link";
import { Suspense } from "react";
import { CtaBand } from "@/components/CtaBand";
import { InventoryCard } from "@/components/InventoryCard";
import { InventoryGrid } from "@/components/InventoryGrid";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { business } from "@/content/business";
import { availableUnits, sizeFilters } from "@/content/inventory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Container Inventory | Used & High Cube Containers in Michigan",
  description:
    "Shipping containers available now, photographed unit by unit: 40 ft standard, 40 ft high cube and open-side units. Request a delivered Michigan quote.",
  path: "/inventory",
});

export default function InventoryPage() {
  const filters = sizeFilters
    .map((f) => ({ ...f, count: availableUnits.filter((u) => u.size === f.value).length }))
    .filter((f) => f.count > 0);
  const items = availableUnits.map((u, i) => ({ size: u.size, node: <InventoryCard unit={u} priority={i === 0} /> }));

  return (
    <>
      <PageHero
        eyebrow="Inventory"
        title="Containers available now"
        lede="Each listing is a specific unit with its own ID. Pick the one you want and we’ll confirm its condition grade and send one delivered price, in writing."
        crumbs={[{ name: "Inventory", path: "/inventory" }]}
      >
        <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "inventory_hero" }}>
          Get a Delivered Quote
        </TrackedLink>
        <Link href="/containers" className="btn btn--lg btn--light">
          Compare Sizes
        </Link>
      </PageHero>

      <section className="section" aria-labelledby="stock-heading">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <h2 id="stock-heading">
                {availableUnits.length} {availableUnits.length === 1 ? "container" : "containers"} listed
              </h2>
              <p className="lede">Photos show the listed unit. Inventory changes as units sell and new ones arrive.</p>
            </div>
          </div>
          {availableUnits.length ? (
            <Suspense
              fallback={
                <ul className="grid grid--3 stock-grid" role="list">
                  {items.map((item, i) => (
                    <li key={i}>{item.node}</li>
                  ))}
                </ul>
              }
            >
              <InventoryGrid filters={filters} total={availableUnits.length} items={items} />
            </Suspense>
          ) : (
            <div className="callout">
              <h3>Every listed unit has sold</h3>
              <p>
                <Link href="/quote">Tell us the size you need</Link> and we’ll check what we can supply for your site.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section section--white" aria-labelledby="how-heading">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow">Buying a listed unit</p>
            <h2 id="how-heading">How a listing becomes a delivery</h2>
          </div>
          <ol className="steps" role="list">
            <li className="step">
              <h3>Request the unit</h3>
              <p>Use the button on its listing. The unit ID travels with your request, so there’s no doubt which container you mean.</p>
            </li>
            <li className="step">
              <h3>We confirm it and price delivery</h3>
              <p>
                You get the unit’s <Link href="/containers/condition-grades">condition grade</Link> and one delivered price for your ZIP code.
                Ask for door-end, interior or close-up photos if you want them.
              </p>
            </li>
            <li className="step">
              <h3>We bring it to your site</h3>
              <p>
                On our own truck and gooseneck trailer. See <Link href="/services/delivery">how delivery works</Link> and what your site needs.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="not-listed-heading">
        <div className="container stack max-prose">
          <h2 id="not-listed-heading">Need a size that isn’t listed?</h2>
          <p className="lede">
            This page shows units we’ve photographed, not everything we can supply. {business.name} also quotes 20 ft containers and other
            grades on request — tell us what you need and where it’s going.
          </p>
          <p>
            <Link href="/quote" className="text-link">
              Request a container quote
            </Link>
          </p>
        </div>
      </section>

      <CtaBand location="inventory" />
    </>
  );
}
