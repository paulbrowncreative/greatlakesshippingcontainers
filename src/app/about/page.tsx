import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { business } from "@/content/business";
import { images } from "@/content/images";
import { howWeWork } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Great Lakes Shipping Containers | Michigan Supplier",
  description:
    "Great Lakes Shipping Containers LLC is a Michigan company selling and renting 20 ft and 40 ft shipping containers with delivery. How we work and what to expect.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Michigan container company"
        lede={`${business.legalName} sells and rents steel shipping containers to the people who need secure space on site — contractors, farmers, businesses and homeowners in ${business.state}.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />
      <section className="section section--white" aria-labelledby="what-we-do">
        <div className="container split">
          <div className="stack">
            <p className="eyebrow">What we do</p>
            <h2 id="what-we-do">{business.tagline}</h2>
            <p>
              Buying a container should be simple: choose a size, know what condition you&apos;re getting, and have it placed where
              you need it. In practice, buyers often get a low price that leaves out delivery, a vague description of condition, and
              a truck that can&apos;t reach the drop spot.
            </p>
            <p>
              We built our process to avoid all three. Every request is quoted for a specific site, with the condition grade named and
              delivery included, and the access questions are settled before anything is scheduled.
            </p>
            <p>
              <Link className="text-link" href="/services/container-sales">
                How buying works
              </Link>
            </p>
          </div>
          <Photo image={images.deliveryYard} aspect="4x3" sizes="(min-width: 60rem) 45vw, 100vw" companyCaption="Our truck and trailer at the container yard" />
        </div>
      </section>
      <section className="section section--dark" aria-labelledby="commitments">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our commitments</p>
            <h2 id="commitments">What you can expect</h2>
          </div>
          <div className="grid grid--4">
            {howWeWork.map((v, i) => (
              <div key={v.title} className="value">
                <span className="value__num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="follow">
        <div className="container container--narrow stack center">
          <h2 id="follow">Follow along</h2>
          <p className="lede" style={{ marginInline: "auto" }}>
            We post updates on Facebook.
          </p>
          <p>
            <a className="btn btn--secondary" href={business.social.facebook} target="_blank" rel="noopener">
              Great Lakes Shipping Containers on Facebook<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>
      <CtaBand location="about_footer" />
    </>
  );
}
