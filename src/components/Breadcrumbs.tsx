import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((c, i) =>
            i === all.length - 1 ? (
              <li key={c.path} aria-current="page">
                {c.name}
              </li>
            ) : (
              <li key={c.path}>
                <Link href={c.path}>{c.name}</Link>
              </li>
            ),
          )}
        </ol>
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbSchema(all) }} />
    </>
  );
}
