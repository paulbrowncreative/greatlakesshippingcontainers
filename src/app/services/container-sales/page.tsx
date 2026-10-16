import Image from "next/image";
import Link from "next/link";
import { ContainerCard } from "@/components/ContainerCard";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { IconArrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { business } from "@/content/business";
import { containers } from "@/content/containers";
import { images } from "@/content/images";
import { pageMetadata, serviceSchema } from "@/lib/seo";

const description =
  "Buy a 20 ft, 40 ft or high cube shipping container in Michigan: how quotes work, what's included, condition grades and what to expect through delivery.";

export const metadata = pageMetadata({
  title: "Buy a Shipping Container in Michigan | Container Sales",
  description,
  path: "/services/container-sales",
});

const faqs = [
  {
    q: "Why don't you list prices online?",
    a: "Container prices move with supply and condition, and delivery cost depends on your exact location and site. A posted price that excludes delivery isn't the price you'll pay — so we quote the full delivered number instead.",
  },
  {
    q: "Can I buy more than one container?",
    a: "Yes. Enter the quantity in the quote form. Multiple units going to the same site are planned together.",
  },
  {
    q: "What should I ask any container seller?",
    a: "Which condition grade the unit is, whether delivery is included in the price, what the delivery truck needs on site, and what happens if the truck can't reach your spot. You should get clear answers to all four before you pay.",
  },
  {
    q: "Can I modify the container after I buy it?",
    a: "It's yours, so yes — though if you plan to add doors, windows or insulation, a one-trip or high cube unit is usually the better starting point. Tell us your plans when you request a quote.",
  },
];

export default function SalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Container sales"
        title="Buy a shipping container"
        lede={`Own a container outright — no monthly payments, no return date. We quote the unit and delivery to your ${business.state} site as one price.`}
        crumbs={[
          { name: "Services", path: "/services/container-sales" },
          { name: "Container Sales", path: "/services/container-sales" },
        ]}
        image={images.container40}
      >
        <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "sales_hero" }}>
          Get a Delivered Quote <IconArrow />
        </TrackedLink>
      </PageHero>

      <section className="section section--white" aria-labelledby="why-buy">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow">Why buy</p>
            <h2 id="why-buy">Storage you own, wherever you need it</h2>
            <p className="lede">
              A steel container is one of the lowest-cost ways to add secure, weatherproof space — and it keeps its resale value.
            </p>
            <ul className="checklist">
              <li>
                <strong>Secure:</strong> 14-gauge corrugated steel walls and lockable cargo doors.
              </li>
              <li>
                <strong>Weatherproof:</strong> built to cross oceans; a good used unit keeps out rain and snow.
              </li>
              <li>
                <strong>Portable:</strong> move it when your site or project changes.
              </li>
              <li>
                <strong>No construction:</strong> no foundation, framing or long build schedule for storage use.
              </li>
            </ul>
          </div>
          <figure className="media media--4x3">
            <Image src={images.winterYard.src} alt={images.winterYard.alt} fill sizes="(min-width: 60rem) 45vw, 100vw" />
            <figcaption>Illustrative photo</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="process">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How buying works</p>
            <h2 id="process">From request to delivery</h2>
          </div>
          <ol className="steps steps--4" role="list">
            <li className="step">
              <h3>Request a quote</h3>
              <p>Size, quantity, ZIP code and timing. Not sure on size? We&apos;ll help.</p>
            </li>
            <li className="step">
              <h3>Review your quote</h3>
              <p>Grade, delivered price and anything we need to know about access — in writing.</p>
            </li>
            <li className="step">
              <h3>Prepare the site</h3>
              <p>A level, firm spot with a clear path for the truck. Our checklist covers it.</p>
            </li>
            <li className="step">
              <h3>Take delivery</h3>
              <p>The container is placed where you&apos;ve chosen, doors facing the way you want.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="sizes">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Sizes</p>
              <h2 id="sizes">Choose your container</h2>
            </div>
            <p className="lede">
              Condition is chosen separately — <Link href="/containers/condition-grades">see what the grades mean</Link>.
            </p>
          </div>
          <div className="grid grid--3">
            {containers.map((c) => (
              <ContainerCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="sales-faq">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="sales-faq">Buying questions</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand location="sales_footer" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...serviceSchema({ name: "Shipping container sales", description, path: "/services/container-sales", serviceType: "Shipping container sales" }),
        }}
      />
    </>
  );
}
