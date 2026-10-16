import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { IconArrow } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TrackedLink } from "@/components/TrackedLink";
import { images } from "@/content/images";
import { deliveryFaqs } from "@/content/pages";
import { pageMetadata, serviceSchema } from "@/lib/seo";

const description =
  "How container delivery works in Michigan: truck space and clearance, preparing the ground, seasonal road limits, and what we need to quote delivery.";

export const metadata = pageMetadata({
  title: "Shipping Container Delivery & Site Prep in Michigan",
  description,
  path: "/services/delivery",
});

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Delivery & placement"
        title="Container delivery, planned around your site"
        lede="Delivery is where most container purchases go wrong — a truck that can't reach the spot, soft ground, a low wire. We settle those questions before we schedule."
        crumbs={[
          { name: "Services", path: "/services/container-sales" },
          { name: "Delivery", path: "/services/delivery" },
        ]}
        image={images.craneLift}
      >
        <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "delivery_hero" }}>
          Quote Delivery to My Site <IconArrow />
        </TrackedLink>
      </PageHero>

      <section className="section section--white" aria-labelledby="need">
        <div className="container split split--top">
          <div className="stack">
            <p className="eyebrow">To quote delivery</p>
            <h2 id="need">What we need from you</h2>
            <p className="lede">The quote form asks for all of this. The more we know, the more accurate the price.</p>
          </div>
          <ul className="checklist">
            <li>
              <strong>Delivery ZIP code</strong> — and the street address once you&apos;re ready to schedule.
            </li>
            <li>
              <strong>Container size and quantity.</strong>
            </li>
            <li>
              <strong>The ground surface</strong> — concrete, asphalt, compacted gravel, dirt or grass.
            </li>
            <li>
              <strong>Access details</strong> — gate widths, overhead wires or branches, slopes, tight turns.
            </li>
            <li>
              <strong>Door direction</strong> — which way you want the doors to face once it&apos;s placed.
            </li>
            <li>
              <strong>Photos of the spot</strong> (optional, but they answer most questions at a glance).
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="checklist">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Site-readiness checklist</p>
            <h2 id="checklist">Before delivery day</h2>
            <p className="lede">
              Delivery is typically by tilt-bed truck, which slides the container off the back. Clearances below are common rules of
              thumb — your quote confirms the exact requirements for the truck assigned.
            </p>
          </div>
          <div className="grid grid--3">
            <div className="card">
              <h3>Straight-line room</h3>
              <p>
                The truck needs to line up straight with the drop spot and pull forward as the container slides off. Plan on roughly
                75 ft of straight clearance for a 20 ft container and about 110 ft for a 40.
              </p>
            </div>
            <div className="card">
              <h3>Width and height</h3>
              <p>
                Allow at least 12 ft of width along the path and about 14 ft of overhead clearance at the drop spot — more where the
                bed tilts. Look up: wires, branches, eaves and carports.
              </p>
            </div>
            <div className="card">
              <h3>Level, firm base</h3>
              <p>
                Concrete, asphalt or compacted gravel are ideal. On soil, set railroad ties or concrete blocks under the four corners.
                A level container keeps its doors opening and sealing properly.
              </p>
            </div>
            <div className="card">
              <h3>Firm approach</h3>
              <p>
                A loaded delivery truck is heavy. Soft lawns, septic fields and wet ground can rut or trap it. Choose a route over firm
                ground, and avoid crossing septic systems or buried lines.
              </p>
            </div>
            <div className="card">
              <h3>Room to open the doors</h3>
              <p>
                Leave several feet in front of the doors so both swing fully open — and enough space to load and unload comfortably.
              </p>
            </div>
            <div className="card">
              <h3>Permissions</h3>
              <p>
                Confirm local zoning, HOA or landlord rules before delivery. On commercial sites, make sure the drop location is
                approved by the property manager.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="michigan">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow">Michigan seasons</p>
            <h2 id="michigan">Plan around frost laws and freeze–thaw</h2>
            <p>
              Each spring, many Michigan roads carry seasonal weight restrictions while the ground thaws — commonly called frost laws.
              County road agencies set their own dates and routes, and heavy deliveries on restricted roads may have to wait. If you
              need a container in March or April, request your quote early.
            </p>
            <p>
              In winter, ask for the drop path to be plowed and keep the container&apos;s roof clear of heavy snow. Placing it on gravel or
              blocks — rather than bare soil — reduces frost heave that can rack the frame out of square.
            </p>
            <p>
              Not sure whether your road is restricted? Your county road commission publishes current seasonal restrictions.
            </p>
          </div>
          <figure className="media media--4x3">
            <Image src={images.sitePlacement.src} alt={images.sitePlacement.alt} fill sizes="(min-width: 60rem) 45vw, 100vw" />
            <figcaption>Illustrative photo</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="delivery-faq">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="delivery-faq">Delivery questions</h2>
            <p className="lede mt-4">
              More detail in our guide to <Link href="/guides/preparing-your-site-for-container-delivery">preparing your site</Link>.
            </p>
          </div>
          <Faq items={deliveryFaqs} />
        </div>
      </section>

      <CtaBand location="delivery_footer" title="Ready to check your site?" body="Send your ZIP code and a few details about access. We'll tell you what the truck needs and quote delivery with the container." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...serviceSchema({ name: "Shipping container delivery and placement", description, path: "/services/delivery", serviceType: "Shipping container delivery" }),
        }}
      />
    </>
  );
}
