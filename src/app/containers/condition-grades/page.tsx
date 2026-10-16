import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { conditionGrades } from "@/content/containers";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping Container Condition Grades: New, Cargo-Worthy, WWT",
  description:
    "What one-trip, cargo-worthy, wind & water tight and as-is mean when you buy a shipping container — and which grade your project actually needs.",
  path: "/containers/condition-grades",
});

const faqs = [
  {
    q: "Which grade is best for storage?",
    a: "For most on-site storage, wind & water tight (WWT) is the best value: it keeps contents dry and secure at a lower price than new. Choose one-trip if appearance matters or you plan to modify the container.",
  },
  {
    q: "Will a used container leak?",
    a: "A properly graded wind & water tight or cargo-worthy container should not leak when new to you. Over time, door gaskets and roof dents that hold standing water are the usual culprits — keep the roof clear of snow and debris and the container level.",
  },
  {
    q: "Can I see the container before it's delivered?",
    a: "Ask when you request your quote. Photos of the specific unit, or the grade's typical condition, help you know what to expect.",
  },
  {
    q: "Is a cargo-worthy container worth it if I'm not shipping anything?",
    a: "Usually not. If you're storing on site, a wind & water tight unit does the same job. Cargo-worthy is worth paying for when you might ship it or resell it later.",
  },
];

export default function GradesPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer's guide"
        title="Container condition grades"
        lede="Two 40-footers can differ widely in price because of grade alone. Here's what each grade means in plain terms — and which one your project actually needs."
        crumbs={[
          { name: "Containers", path: "/containers" },
          { name: "Condition Grades", path: "/containers/condition-grades" },
        ]}
      />
      <section className="section" aria-label="Grades">
        <div className="container">
          <div className="grid grid--2">
            {conditionGrades.map((g) => (
              <article key={g.id} className="card" id={g.id}>
                <p className="eyebrow" style={{ marginBottom: "var(--space-2)" }}>
                  {g.aka ?? "Grade"}
                </p>
                <h2 style={{ fontSize: "var(--fs-h3)", textTransform: "none" }}>{g.name}</h2>
                <p style={{ fontWeight: 500, color: "var(--ink)" }}>{g.summary}</p>
                <p>{g.detail}</p>
                <dl className="mt-4 small" style={{ display: "grid", gap: "var(--space-2)" }}>
                  <div>
                    <dt style={{ fontWeight: 600, color: "var(--ink)" }}>Good for</dt>
                    <dd className="muted">{g.goodFor}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 600, color: "var(--ink)" }}>Watch for</dt>
                    <dd className="muted">{g.watchFor}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--white" aria-labelledby="inspect">
        <div className="container split">
          <Photo image={images.usedStack} aspect="4x3" sizes="(min-width: 60rem) 45vw, 100vw" companyCaption="Used containers in the yard" />
          <div className="stack">
            <p className="eyebrow">Checking a used unit</p>
            <h2 id="inspect">What to look at when it arrives</h2>
            <ul className="checklist">
              <li>
                <strong>Doors:</strong> they should open and close fully, and the lock rods should seat in their keepers.
              </li>
              <li>
                <strong>Gaskets:</strong> rubber door seals intact, without tears or missing sections.
              </li>
              <li>
                <strong>Light test:</strong> step inside, close the doors, and look for daylight through the roof or walls.
              </li>
              <li>
                <strong>Floor:</strong> solid underfoot, without soft spots or delamination.
              </li>
              <li>
                <strong>Roof:</strong> dents that will pool water are worth noting — keep them clear of snow and ice in winter.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="grades-faq">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="grades-faq">Grade questions</h2>
            <p className="lede mt-4">
              Pick a size next: <Link href="/containers/20-ft-shipping-containers">20 ft</Link>,{" "}
              <Link href="/containers/40-ft-shipping-containers">40 ft</Link> or{" "}
              <Link href="/containers/40-ft-high-cube-containers">40 ft high cube</Link>.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
      <CtaBand location="grades_footer" title="Not sure which grade fits?" body="Tell us what you're storing and how long you'll keep it. We'll recommend a grade and quote it delivered." />
    </>
  );
}
