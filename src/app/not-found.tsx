import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow stack">
        <p className="kicker-num" aria-hidden>
          404
        </p>
        <h1 style={{ fontSize: "var(--fs-h2)" }}>This page isn&apos;t here</h1>
        <p className="lede">The link may be old, or the page may have moved. These are the places most people are looking for:</p>
        <ul className="checklist">
          <li>
            <Link href="/containers">Container sizes &amp; specs</Link>
          </li>
          <li>
            <Link href="/services/delivery">Delivery &amp; site prep</Link>
          </li>
          <li>
            <Link href="/guides">Buying guides</Link>
          </li>
          <li>
            <Link href="/contact">Contact us</Link>
          </li>
        </ul>
        <p className="cluster mt-5">
          <Link href="/quote" className="btn">
            Request a Quote
          </Link>
          <Link href="/" className="btn btn--secondary">
            Go to Home
          </Link>
        </p>
      </div>
    </section>
  );
}
