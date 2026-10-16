import Link from "next/link";
import { CompareTable } from "@/components/CompareTable";
import { ContainerCard } from "@/components/ContainerCard";
import { ContainerChooser } from "@/components/ContainerChooser";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { containers } from "@/content/containers";
import { absoluteUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Container Sizes & Specs | 20 ft, 40 ft & High Cube",
  description:
    "Compare 20 ft, 40 ft and high cube shipping containers: inside dimensions, door openings, weight and volume. Find your size and get a delivered Michigan quote.",
  path: "/containers",
});

const faqs = [
  {
    q: "What size shipping container is most popular?",
    a: "The 20 ft and 40 ft standard containers. The 20 fits more sites; the 40 gives twice the floor space for a delivery cost that's usually similar.",
  },
  {
    q: "Are inside dimensions the same on every container?",
    a: "Very close, but not identical. Manufacturers and build years differ by an inch or two. If an exact fit matters — racking, a vehicle, a machine — tell us the measurement and we'll confirm it against the actual unit.",
  },
  {
    q: "Do you offer other sizes?",
    a: "Ask. 10 ft, 45 ft, 20 ft high cube and specialty containers (open-side, double-door, refrigerated) exist but are less common. Choose “Other / specialty size” in the quote form and describe what you need.",
  },
];

export default function ContainersPage() {
  return (
    <>
      <PageHero
        eyebrow="Containers"
        title="Shipping container sizes"
        lede="Three sizes handle almost every storage job. Compare floor space, door height and site requirements, then let us match the right unit to your project."
        crumbs={[{ name: "Containers", path: "/containers" }]}
      >
        <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "containers_hero" }}>
          Get a Delivered Quote
        </TrackedLink>
        <Link href="#size-chooser" className="btn btn--lg btn--light">
          Help Me Choose
        </Link>
      </PageHero>

      <section className="section" aria-label="Container sizes">
        <div className="container">
          <div className="grid grid--3">
            {containers.map((c) => (
              <ContainerCard key={c.slug} c={c} headingLevel={2} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="compare-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Side by side</p>
            <h2 id="compare-heading">Compare dimensions</h2>
            <p className="lede">Outside dimensions decide where it fits. Inside dimensions and door size decide what fits in it.</p>
          </div>
          <CompareTable />
        </div>
      </section>

      <section className="section section--paper2" aria-label="Size chooser">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow">Choosing a size</p>
            <h2>Size by what you store — and where it goes</h2>
            <p className="lede">A few rules of thumb:</p>
            <ul className="checklist">
              <li>
                <strong>Count pallets.</strong> A 20 ft holds about 10 standard pallets on the floor; a 40 ft about 20.
              </li>
              <li>
                <strong>Measure your tallest item.</strong> Standard doors open to about 7 ft 6 in; high cube doors to about 8 ft 5 in.
              </li>
              <li>
                <strong>Check the drop zone.</strong> Delivery needs much more room than the container — a clear approach and
                overhead clearance.
              </li>
              <li>
                <strong>Price the 40 too.</strong> Delivery costs are similar for both sizes, so the 40 often wins on cost per square
                foot.
              </li>
            </ul>
            <p>
              <Link className="text-link" href="/guides/20-ft-vs-40-ft-shipping-container">
                Read the full 20 ft vs 40 ft guide
              </Link>
            </p>
          </div>
          <ContainerChooser />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="containers-faq">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="containers-faq">Sizing questions</h2>
            <p className="lede mt-4">
              Condition matters as much as size. <Link href="/containers/condition-grades">See how container grades compare</Link>.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand location="containers_footer" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Shipping container sizes",
          itemListElement: containers.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: absoluteUrl(`/containers/${c.slug}`) })),
        }}
      />
    </>
  );
}
