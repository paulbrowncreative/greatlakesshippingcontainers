import Image from "next/image";
import Link from "next/link";
import { conditions, labelFor } from "@/lib/inquiry";
import { unitSpecs, unitTitle, type InventoryUnit } from "@/content/inventory";
import { TrackedLink } from "./TrackedLink";

export function InventoryCard({ unit, headingLevel = 3, priority }: { unit: InventoryUnit; headingLevel?: 2 | 3; priority?: boolean }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const specs = unitSpecs(unit);
  const pending = unit.status === "pending";
  return (
    <article className="stock-card" id={unit.id.toLowerCase()} aria-labelledby={`${unit.id}-title`}>
      <div className="stock-card__media">
        <Image
          src={unit.image.src}
          alt={unit.image.alt}
          width={unit.image.width}
          height={unit.image.height}
          sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
        />
        <span className={`stock-card__status${pending ? " stock-card__status--pending" : ""}`}>{pending ? "Sale pending" : "Available"}</span>
      </div>
      <div className="stock-card__body">
        <p className="stock-card__id tabular">Unit {unit.id}</p>
        <H id={`${unit.id}-title`}>{unitTitle(unit)}</H>
        <ul className="chips" role="list" aria-label="Unit details">
          {unit.age && <li className="chip">{unit.age}</li>}
          <li className="chip">{unit.color}</li>
          <li className="chip">{specs.heightLabel}</li>
        </ul>
        <p className="small">{unit.notes}</p>
        <dl className="stock-card__facts">
          <div>
            <dt>Grade</dt>
            <dd>{unit.grade ? labelFor(conditions, unit.grade) : "Confirmed on your quote"}</dd>
          </div>
          <div>
            <dt>Inside (typical)</dt>
            <dd className="tabular">
              {specs.insideLength} × {specs.insideHeight} high
            </dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>{unit.price ? `$${unit.price.toLocaleString("en-US")}` : "Delivered price on request"}</dd>
          </div>
        </dl>
        <div className="stock-card__actions">
          <TrackedLink
            href={`/quote?unit=${unit.id}`}
            className="btn"
            event="quote_cta_click"
            eventParams={{ location: "inventory_card", unit_id: unit.id, container_size: unit.size }}
          >
            Request This Container<span className="sr-only"> ({unit.id})</span>
          </TrackedLink>
          <Link href={specs.specsHref} className="text-link small">
            {specs.specsLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
