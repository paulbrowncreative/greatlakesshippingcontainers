import Link from "next/link";
import { notFound } from "next/navigation";
import { ContainerCard } from "@/components/ContainerCard";
import { RelatedReading } from "@/components/blog/RelatedReading";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { IconArrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { TrackedLink } from "@/components/TrackedLink";
import { business, offers } from "@/content/business";
import { containers } from "@/content/containers";
import { images } from "@/content/images";
import { pageMetadata, serviceSchema } from "@/lib/seo";

const description =
  "Rent a 20 ft or 40 ft shipping container in Michigan for jobsite, renovation or seasonal storage. How renting works, rent vs buy, and how to get a rental quote.";

export const metadata = pageMetadata({
  title: "Shipping Container Rentals in Michigan | Great Lakes Containers",
  description,
  path: "/services/container-rentals",
});

const faqs = [
  {
    q: "How long can I rent a container?",
    a: "Tell us roughly how long you need it when you request a quote — a few months for a remodel, a season, or open-ended for a long project. Your quote spells out the rental terms.",
  },
  {
    q: "Should I rent or buy?",
    a: "Renting suits short projects and needs with a clear end date. If you'll need storage for a long time, or indefinitely, buying usually works out better. Not sure? Ask us to quote both.",
  },
  {
    q: "Do I need to empty the container before pickup?",
    a: "Yes. Containers need to be empty before they're picked up and moved. Plan a little time at the end of your project to clear it out.",
  },
  {
    q: "What does my site need for a rental delivery?",
    a: "The same as any delivery: a level, firm spot and room for our truck and gooseneck trailer to get in and out. Our delivery checklist covers the details.",
  },
  {
    q: "Do I need a permit for a rental container?",
    a: "It depends on your city or township, and sometimes on how long the container stays. Check with your local zoning office — and your HOA, if you have one — before delivery.",
  },
];

export default function RentalsPage() {
  if (!offers("rental")) notFound();
  return (
    <>
      <PageHero
        eyebrow={`Container rentals · ${business.state}`}
        title="Shipping container rentals"
        lede="Secure, weatherproof storage for a project, a season or a move — delivered to your site and taken away when you're done."
        crumbs={[
          { name: "Services", path: "/services/container-sales" },
          { name: "Container Rentals", path: "/services/container-rentals" },
        ]}
        image={images.newOnTrailer}
      >
        <TrackedLink href="/quote?type=rent" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "rentals_hero" }}>
          Get a Rental Quote <IconArrow />
        </TrackedLink>
        <Link href="/services/container-sales" className="btn btn--lg btn--light">
          Compare Buying
        </Link>
      </PageHero>

      <section className="section section--white" aria-labelledby="when-rent">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow">When renting makes sense</p>
            <h2 id="when-rent">Storage with an end date</h2>
            <p className="lede">Rent when you need the space for a defined stretch of time and don&apos;t want to own a container afterward.</p>
            <ul className="checklist">
              <li>
                <strong>Construction and remodeling:</strong> lockable storage on site for the length of the job.
              </li>
              <li>
                <strong>Moves and renovations:</strong> keep furniture and belongings secure in your own driveway.
              </li>
              <li>
                <strong>Seasonal inventory:</strong> extra space for peak season, gone when it ends.
              </li>
              <li>
                <strong>Farms:</strong> short-term storage around planting or harvest.
              </li>
            </ul>
          </div>
          <Photo image={images.new20} companyCaption="Example units — your quote names the unit's condition" />
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="rent-process">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How renting works</p>
            <h2 id="rent-process">Four steps, start to finish</h2>
          </div>
          <ol className="steps steps--4" role="list">
            <li className="step">
              <h3>Request a rental quote</h3>
              <p>Size, ZIP code, start date and roughly how long you need it.</p>
            </li>
            <li className="step">
              <h3>Confirm the details</h3>
              <p>We confirm the unit, the terms and what your site needs for delivery.</p>
            </li>
            <li className="step">
              <h3>We deliver</h3>
              <p>Our truck and gooseneck trailer bring the container to the spot you&apos;ve chosen.</p>
            </li>
            <li className="step">
              <h3>We pick it up</h3>
              <p>When you&apos;re finished, empty it and let us know. We schedule the pickup.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="rent-vs-buy">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Rent or buy?</p>
            <h2 id="rent-vs-buy">Choose by how long you&apos;ll need it</h2>
          </div>
          <div className="grid grid--2">
            <div className="card">
              <h3>Rent if…</h3>
              <ul className="checklist mt-4">
                <li>The project has a clear end date</li>
                <li>You don&apos;t want to own or resell a container later</li>
                <li>You want it picked up when you&apos;re done</li>
              </ul>
            </div>
            <div className="card">
              <h3>Buy if…</h3>
              <ul className="checklist mt-4">
                <li>You need storage for the long term or indefinitely</li>
                <li>You may modify the container</li>
                <li>You want an asset that keeps resale value</li>
              </ul>
              <p className="mt-4">
                <Link className="text-link" href="/services/container-sales">
                  How buying works
                </Link>
              </p>
            </div>
          </div>
          <p className="mt-6 muted">Between the two? Ask us to quote both on the same request.</p>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="rent-sizes">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sizes</p>
            <h2 id="rent-sizes">Container sizes</h2>
          </div>
          <div className="grid grid--3">
            {containers.map((c) => (
              <ContainerCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rent-faq">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="rent-faq">Rental questions</h2>
            <p className="lede mt-4">
              Before delivery, run through the <Link href="/services/delivery">site-prep checklist</Link>.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <RelatedReading path="/services/container-rentals" />
      <CtaBand
        location="rentals_footer"
        title="Get a rental quote"
        body="Tell us the size, your ZIP code, when you need it and for how long. We'll confirm the unit, the terms and what your site needs."
        ctaLabel="Request a Rental Quote"
        ctaHref="/quote?type=rent"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...serviceSchema({ name: "Shipping container rentals", description, path: "/services/container-rentals", serviceType: "Shipping container rental" }),
        }}
      />
    </>
  );
}
