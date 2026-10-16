import type { ContainerProduct, Spec } from "@/content/containers";

function Group({ title, specs }: { title: string; specs: Spec[] }) {
  return (
    <div className="plate__group">
      <h3>{title}</h3>
      <dl>
        {specs.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              {s.value}
              {s.note && <span className="sr-only"> ({s.note})</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Spec table styled after the data plate riveted to a container's door. */
export function SpecPlate({ c }: { c: ContainerProduct }) {
  return (
    <section className="plate" aria-labelledby="spec-plate-title">
      <header className="plate__head">
        <h2 id="spec-plate-title">Typical specifications</h2>
        <span>{c.shortName}</span>
      </header>
      <Group title="Outside" specs={c.external} />
      <Group title="Inside" specs={c.internal} />
      <Group title="Door opening" specs={c.door} />
      <Group title="Weight" specs={c.weight} />
      <Group title="Capacity" specs={c.capacity} />
      <p className="plate__foot">
        Typical ISO dry-container figures. Exact dimensions and weights vary by manufacturer and build year — the specific
        unit&apos;s CSC plate governs, and we confirm it on your quote.
      </p>
    </section>
  );
}
