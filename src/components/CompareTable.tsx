import Link from "next/link";
import { containers } from "@/content/containers";

const rows: { label: string; pick: (c: (typeof containers)[number]) => string }[] = [
  { label: "Outside (L × W × H)", pick: (c) => c.external.map((s) => s.value).join(" × ") },
  { label: "Inside (L × W × H)", pick: (c) => c.internal.map((s) => s.value).join(" × ") },
  { label: "Door opening (W × H)", pick: (c) => c.door.map((s) => s.value).join(" × ") },
  { label: "Floor area", pick: (c) => c.capacity[0].value },
  { label: "Volume", pick: (c) => c.capacity[1].value },
  { label: "Empty weight", pick: (c) => c.weight[0].value },
];

export function CompareTable() {
  return (
    <div className="table-wrap" role="region" aria-labelledby="compare-caption" tabIndex={0}>
      <table className="compare">
        <caption id="compare-caption">
          Typical dimensions for standard dry containers. Individual units vary slightly by manufacturer.
        </caption>
        <thead>
          <tr>
            <td />
            {containers.map((c) => (
              <th key={c.slug} scope="col">
                <Link href={`/containers/${c.slug}`} style={{ color: "inherit" }}>
                  {c.shortName}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {containers.map((c) => (
                <td key={c.slug}>{r.pick(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
