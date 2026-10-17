import Link from "next/link";
import { RelatedReading } from "@/components/blog/RelatedReading";
import { CtaBand } from "@/components/CtaBand";
import { IconArrow } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { business } from "@/content/business";
import { serviceAreas } from "@/content/service-areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Container Delivery Area in Michigan",
  description:
    "Where Great Lakes Shipping Containers delivers in Michigan and how delivery is quoted by ZIP code, including seasonal road limits and site access.",
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title={`Delivering containers in ${business.state}`}
        lede="We're a Michigan company, and we quote every delivery by ZIP code. Distance, route and site access all affect delivery cost — so the fastest way to know whether we can reach you is to ask."
        crumbs={[{ name: "Service Area", path: "/service-area" }]}
      >
        <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "service_area_hero" }}>
          Check Delivery to My ZIP <IconArrow />
        </TrackedLink>
      </PageHero>

      <section className="section section--white" aria-labelledby="how-priced">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow">How delivery is priced</p>
            <h2 id="how-priced">Your ZIP code sets the price, your site sets the plan</h2>
          </div>
          <div className="stack">
            <p>
              Container delivery cost is driven mostly by distance from where the unit is sourced and the equipment needed to place it.
              Two addresses in the same city can quote differently if one has a tight alley and the other an open lot.
            </p>
            <p>
              That&apos;s why we don&apos;t publish a flat delivery rate or a list of towns. Enter your ZIP code in the quote form and
              we&apos;ll confirm whether we deliver there and what it costs — usually alongside a question or two about access.
            </p>
            <ul className="checklist">
              <li>Residential driveways, farms, jobsites and commercial lots</li>
              <li>Single containers or multiple units to one site</li>
              <li>Delivery timing planned around Michigan&apos;s spring seasonal weight restrictions</li>
            </ul>
          </div>
        </div>
      </section>

      {serviceAreas.length > 0 && (
        <section className="section" aria-labelledby="areas">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Areas we serve</p>
              <h2 id="areas">Delivery areas</h2>
            </div>
            <ul className="grid grid--3" role="list">
              {serviceAreas.map((a) => (
                <li key={a.slug} className="card">
                  <h3>
                    <Link href={`/service-area/${a.slug}`}>{a.name}</Link>
                  </h3>
                  <p>{a.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--dark" aria-labelledby="ready">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow">Before you request a quote</p>
            <h2 id="ready">Have these handy</h2>
          </div>
          <ul className="checklist">
            <li>The ZIP code (and later the address) where the container will sit</li>
            <li>A rough idea of the spot: surface, slope, and what&apos;s overhead</li>
            <li>Any gates, narrow drives or tight turns the truck must pass</li>
            <li>When you need it — especially if that&apos;s during the spring thaw</li>
          </ul>
        </div>
      </section>
      <p className="container small muted" style={{ paddingBlock: "var(--space-5)" }}>
        Read our <Link href="/services/delivery">delivery &amp; site-prep guide</Link> for clearance rules of thumb.
      </p>
      <RelatedReading path="/service-area" title="Planning a Michigan delivery" />
      <CtaBand location="service_area_footer" title="Do you deliver to my ZIP?" body="Ask in the quote form — it takes two minutes, and we'll answer with a delivered price." />
    </>
  );
}
