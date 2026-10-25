"use client";

import { useSearchParams } from "next/navigation";
import { getUnit } from "@/content/inventory";
import { containerSizes, inquiryTypes, type InquiryInput } from "@/lib/inquiry";
import { InquiryForm } from "./InquiryForm";

/**
 * Pre-selects size (?size=40-high-cube), request type (?type=rent) or a specific
 * inventory unit (?unit=GL-004, which also sets its size) when arriving from a CTA.
 */
export function QuoteFormFromQuery() {
  const params = useSearchParams();
  const size = params.get("size") ?? "";
  const type = params.get("type") ?? "";
  const unit = getUnit(params.get("unit") ?? "");
  const initial: Partial<InquiryInput> = {};
  if (containerSizes.some((s) => s.value === size)) initial.containerSize = size;
  if (inquiryTypes.some((t) => t.value === type)) initial.inquiryType = type;
  if (unit && unit.status !== "sold") {
    initial.unitId = unit.id;
    initial.containerSize = unit.size;
  }
  return (
    <InquiryForm
      key={`${initial.containerSize ?? ""}|${initial.inquiryType ?? ""}|${initial.unitId ?? ""}`}
      mode="quote"
      initial={initial}
    />
  );
}
