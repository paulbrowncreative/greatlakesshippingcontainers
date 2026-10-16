"use client";

import { useSearchParams } from "next/navigation";
import { containerSizes } from "@/lib/inquiry";
import { InquiryForm } from "./InquiryForm";

/** Pre-selects the container size when arriving from a product page (?size=40-high-cube). */
export function QuoteFormFromQuery() {
  const size = useSearchParams().get("size") ?? "";
  const valid = containerSizes.some((s) => s.value === size);
  return <InquiryForm key={valid ? size : "none"} mode="quote" initial={valid ? { containerSize: size } : undefined} />;
}
