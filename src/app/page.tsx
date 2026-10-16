import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ContainerCard } from "@/components/ContainerCard";
import { ContainerChooser } from "@/components/ContainerChooser";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { IconArrow } from "@/components/Icons";
import { TrackedLink } from "@/components/TrackedLink";
import { business } from "@/content/business";
import { containers } from "@/content/containers";
import { homeFaqs, howWeWork, uses } from "@/content/pages";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Containers for Sale in Michigan | Great Lakes Containers",
  description:
    "20 ft, 40 ft and high cube shipping containers for sale with delivery to your Michigan site. Compare sizes, see typical specs and request a delivered quote.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" quality={70} />
        </div>
        <div className="container hero__inner">
          <div>
            <p className="eyebrow" style={{ color: "var(--corten-200)" }}>
              Shipping containers for sale · {business.state}
            </p>
            <h1>
              Shipping containers <em>for every need</em>
            </h1>
            <p className="hero__lede">
              20 ft and 40 ft steel containers for jobsites, farms, businesses and homes — quoted with delivery to your
              site. Tell us the size and ZIP code, and we&apos;ll come back with the right unit and one delivered price.
            </p>
            <div className="hero__actions cluster">
              <TrackedLink href="/quote" className="btn btn--lg" event="quote_cta_click" eventParams={{ location: "hero" }}>
                Get a Delivered Quote <IconArrow />
              </TrackedLink>
              <Link href="/containers" className="btn btn--lg btn--light">
                Compare Sizes
              </Link>
            </div>
            <p className="hero__note">Not sure what size you need? That&apos;s fine — the quote form helps you choose.</p>
          </div>
          <dl className="hero__facts tabular">
            <div className="hero__fact">
              <dt>20 ft standard</dt>
              <dd>1,170 cu ft</dd>
            </div>
            <div className="hero__fact">
              <dt>40 ft standard</dt>
              <dd>2,390 cu ft</dd>
            </div>
            <div className="hero__fact">
              <dt>40 ft high cube</dt>
              <dd>9&apos;6&quot; tall</dd>
            </div>
            <div className="hero__fact">
              <dt>Your quote</dt>
              <dd>Delivered price</dd>
            </div>
          </dl>
        </div>
        {images.hero.illustrative && <span className="photo-note">Illustrative photo</span>}
      </section>

      <section className="section section--white" aria-labelledby="how-we-work">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 id="how-we-work">Straight answers before the truck rolls</h2>
            </div>
            <p className="lede">
              Buying a container shouldn&apos;t involve guessing what shows up or whether the truck can reach your spot. Every
              quote is built around your site.
            </p>
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

      <section className="section" aria-labelledby="containers-heading">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Containers</p>
              <h2 id="containers-heading">Pick a size. We&apos;ll match the unit.</h2>
            </div>
            <div className="stack">
              <p className="lede">
                Three sizes cover almost every storage job. Choose by floor space, door height and how much room you have for
                delivery.
              </p>
              <Link href="/containers" className="text-link">
                Compare all sizes side by side
              </Link>
            </div>
          </div>
          <div className="grid grid--3">
            {containers.map((c) => (
              <ContainerCard key={c.slug} c={c} />
            ))}
          </div>
          <div className="callout mt-6">
            <h3>New, cargo-worthy or wind &amp; water tight?</h3>
            <p>
              Condition grade affects price more than size does. Learn what each grade means — and which one your project actually
              needs — before you compare quotes. <Link href="/containers/condition-grades">Read the grade guide</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="uses-heading">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="eyebrow">Uses</p>
              <h2 id="uses-heading">Secure storage that goes where you need it</h2>
            </div>
            <p className="lede">
              Steel walls, lockable cargo doors and a hardwood floor rated for heavy loads — placed right where the work happens.
            </p>
          </div>
          <div className="grid grid--3">
            {uses.map((u) => (
              <div key={u.id} className="value">
                <h3>{u.title}</h3>
                <p>{u.short}</p>
              </div>
            ))}
          </div>
          <p className="mt-7">
            <Link href="/uses" className="text-link">
              See how each industry uses containers
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="delivery-heading">
        <div className="container split split--wide-right">
          <div className="media-offset">
            <Photo image={images.craneLift} aspect="4x3" sizes="(min-width: 60rem) 45vw, 100vw" />
          </div>
          <div>
            <p className="eyebrow">Delivery</p>
            <h2 id="delivery-heading">Planned for your site, not just your ZIP code</h2>
            <p className="lede mt-4">
              Most delivery problems are access problems. We ask the right questions first so delivery day is uneventful.
            </p>
            <ol className="steps steps--2 mt-6" role="list" style={{ gridTemplateColumns: "1fr" }}>
              <li className="step">
                <h3>Tell us size, quantity and ZIP</h3>
                <p>Two minutes online. Photos of the drop spot help.</p>
              </li>
              <li className="step">
                <h3>We confirm access and price</h3>
                <p>Approach, clearance and surface — then one delivered price in writing.</p>
              </li>
              <li className="step">
                <h3>Prep the pad, we schedule the drop</h3>
                <p>Level, firm ground and a clear path. Doors face the way you choose.</p>
              </li>
            </ol>
            <p className="mt-6">
              <Link href="/services/delivery" className="text-link">
                Delivery requirements &amp; site-prep checklist
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="michigan-heading">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Planning a {business.state} delivery</p>
            <h2 id="michigan-heading">Three things Michigan buyers should know</h2>
          </div>
          <div className="grid grid--3">
            <div className="card">
              <h3>Spring frost laws</h3>
              <p>
                Many Michigan roads carry seasonal weight restrictions during the spring thaw. If your site is on a restricted county
                road, delivery timing may need to work around them — order early if you need a container in March or April.
              </p>
            </div>
            <div className="card">
              <h3>Frozen and soft ground</h3>
              <p>
                Frozen ground is firm until it isn&apos;t. Plan a gravel or blocked base that stays level through freeze–thaw cycles
                so the doors keep closing square.
              </p>
            </div>
            <div className="card">
              <h3>Local rules vary</h3>
              <p>
                Cities, townships and HOAs set their own rules on placement, setbacks and how long a container can stay. A quick call
                to your local zoning office before delivery avoids surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper2" aria-label="Container size chooser">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Size chooser</p>
            <h2>Not sure where to start?</h2>
            <p className="lede mt-4">
              Answer three questions and get a starting recommendation. You can send it straight into a quote request — we&apos;ll
              double-check it against your site.
            </p>
            <div className="mt-6">
              <Photo image={images.container20} aspect="3x2" companyCaption="A 20 ft container placed on a plowed lot" />
            </div>
          </div>
          <ContainerChooser />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="faq-heading">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-heading">Common questions</h2>
            <p className="lede mt-4">
              Don&apos;t see yours? Ask it in the{" "}
              <Link href="/contact">contact form</Link> and we&apos;ll answer by email.
            </p>
          </div>
          <Faq items={homeFaqs} openFirst />
        </div>
      </section>

      <CtaBand location="home_footer" />
    </>
  );
}
