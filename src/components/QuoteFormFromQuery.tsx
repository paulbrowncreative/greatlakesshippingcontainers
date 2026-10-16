"use client";

import { useSearchParams } from "next/navigation";
import { containerSizes, inquiryTypes, type InquiryInput } from "@/lib/inquiry";
import { InquiryForm } from "./InquiryForm";

/** Pre-selects size (?size=40-high-cube) and request type (?type=rent) when arriving from a CTA. */
export function QuoteFormFromQuery() {
  const params = useSearchParams();
  const size = params.get("size") ?? "";
  const type = params.get("type") ?? "";
  const initial: Partial<InquiryInput> = {};
  if (containerSizes.some((s) => s.value === size)) initial.containerSize = size;
  if (inquiryTypes.some((t) => t.value === type)) initial.inquiryType = type;
  return <InquiryForm key={`${initial.containerSize ?? ""}|${initial.inquiryType ?? ""}`} mode="quote" initial={initial} />;
}
