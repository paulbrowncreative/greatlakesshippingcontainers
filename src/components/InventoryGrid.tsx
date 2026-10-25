"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { UnitSize } from "@/content/inventory";

type Filter = { value: UnitSize; label: string; count: number };

/**
 * Size filter for the inventory grid. Every card is rendered on the server (so all units
 * are crawlable and visible without JavaScript); this only hides the ones that don't match.
 * The choice lives in ?size= so a filtered view can be linked from a product page. Render it
 * inside <Suspense> with the plain list as the fallback (useSearchParams opts out of prerendering).
 */
export function InventoryGrid({ filters, total, items }: { filters: Filter[]; total: number; items: { size: UnitSize; node: ReactNode }[] }) {
  // Next keeps useSearchParams in sync with history.replaceState, so the URL is the only state.
  const params = useSearchParams();
  const fromUrl = params.get("size");
  const size = filters.find((f) => f.value === fromUrl)?.value ?? "";

  const choose = (value: UnitSize | "") => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("size", value);
    else url.searchParams.delete("size");
    window.history.replaceState(null, "", url);
  };

  const shown = size ? items.filter((i) => i.size === size).length : total;

  return (
    <>
      {filters.length > 1 && (
        <div className="stock-filter" role="group" aria-label="Filter by size">
          <button type="button" aria-pressed={size === ""} onClick={() => choose("")}>
            All sizes <span className="tabular">({total})</span>
          </button>
          {filters.map((f) => (
            <button key={f.value} type="button" aria-pressed={size === f.value} onClick={() => choose(f.value)}>
              {f.label} <span className="tabular">({f.count})</span>
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {size ? `Showing ${shown} of ${total} containers.` : ""}
      </p>
      <ul className="grid grid--3 stock-grid" role="list">
        {items.map((item, i) => (
          <li key={i} hidden={Boolean(size) && item.size !== size}>
            {item.node}
          </li>
        ))}
      </ul>
    </>
  );
}
