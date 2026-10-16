import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { images } from "@/content/images";
import { uses } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Container Uses: Jobsite, Farm, Business & Home Storage",
  description:
    "How contractors, farms, retailers, manufacturers and homeowners use shipping containers for secure on-site storage, and which size suits each job.",
  path: "/uses",
});

export default function UsesPage() {
  return (
    <>
      <PageHero
        eyebrow="Container uses"
        title="Who uses shipping containers — and why"
        lede="A container is a lockable steel room you can put almost anywhere. Here's how different customers use them, and the size that usually fits."
        crumbs={[{ name: "Uses", path: "/uses" }]}
        image={images.agriculture}
      />
      <nav className="section--white" aria-label="Jump to a use" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ paddingBlock: "var(--space-4)" }}>
          <ul className="chips" role="list">
            {uses.map((u) => (
              <li key={u.id}>
                <a className="chip" href={`#${u.id}`} style={{ textDecoration: "none", minHeight: "2.75rem" }}>
                  {u.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {uses.map((u, i) => (
        <section key={u.id} id={u.id} className={`section section--tight${i % 2 ? "" : " section--white"}`} aria-labelledby={`${u.id}-h`}>
          <div className={`container ${u.image ? "split" : ""}`}>
            <div className="stack" style={{ maxWidth: u.image ? undefined : "46rem" }}>
              <p className="eyebrow">0{i + 1}</p>
              <h2 id={`${u.id}-h`}>{u.title}</h2>
              {u.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <strong>Typical size:</strong> {u.sizes}
              </p>
              <p>
                <Link className="text-link" href="/quote">
                  Quote a container for this use
                </Link>
              </p>
            </div>
            {u.image && (
              <figure className="media media--4x3">
                <Image src={u.image.src} alt={u.image.alt} fill sizes="(min-width: 60rem) 45vw, 100vw" />
                <figcaption>Illustrative photo</figcaption>
              </figure>
            )}
          </div>
        </section>
      ))}
      <CtaBand location="uses_footer" title="Tell us what you're storing" body="We'll recommend a size and grade for the job and quote it delivered to your site." />
    </>
  );
}
