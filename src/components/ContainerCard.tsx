import Image from "next/image";
import Link from "next/link";
import type { ContainerProduct } from "@/content/containers";

export function ContainerCard({ c, headingLevel = 3 }: { c: ContainerProduct; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const inside = (label: string) => c.internal.find((s) => s.label === label)?.value ?? "";
  return (
    <article className="unit-card">
      <div className="unit-card__media">
        <Image src={c.image.src} alt="" fill sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw" />
        <span className="unit-card__badge" aria-hidden>
          {c.badge}
        </span>
      </div>
      <div className="unit-card__body">
        <H>
          <Link href={`/containers/${c.slug}`}>{c.shortName}</Link>
        </H>
        <p className="muted small">{c.summary}</p>
        <dl className="unit-card__specs tabular" aria-label="Typical interior dimensions">
          <div>
            <dt>Inside L</dt>
            <dd>{inside("Length")}</dd>
          </div>
          <div>
            <dt>Inside H</dt>
            <dd>{inside("Height")}</dd>
          </div>
          <div>
            <dt>Volume</dt>
            <dd>{c.capacity.find((s) => s.label === "Volume")?.value.replace("≈ ", "")}</dd>
          </div>
        </dl>
        <span className="text-link" aria-hidden>
          Specs &amp; uses
        </span>
      </div>
    </article>
  );
}
