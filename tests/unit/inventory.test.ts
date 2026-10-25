import { describe, expect, it } from "vitest";
import { availableUnits, getUnit, inventory, unitLabel, unitProduct, unitSpecs } from "@/content/inventory";
import { emptyInquiry, normalize, toInquiry } from "@/lib/inquiry";
import { buildSubject, buildText } from "@/lib/server/email-template";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("inventory data", () => {
  it("has unique, well-formed IDs and real image files", () => {
    const ids = inventory.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const u of inventory) {
      expect(u.id).toMatch(/^GL-\d{3}$/);
      expect(existsSync(join(process.cwd(), "public", u.image.src)), u.image.src).toBe(true);
      expect(u.image.alt.length).toBeGreaterThan(20);
      expect(unitProduct(u)).toBeDefined();
    }
  });

  it("hides sold units and looks IDs up case-insensitively", () => {
    expect(availableUnits.every((u) => u.status !== "sold")).toBe(true);
    expect(getUnit("gl-001")?.id).toBe("GL-001");
    expect(getUnit("GL-999")).toBeUndefined();
  });

  it("labels a unit with ID, size, variant and color", () => {
    expect(unitLabel(getUnit("GL-005")!)).toBe("GL-005 · 40 ft high cube, open side · Beige");
    expect(unitLabel(getUnit("GL-001")!)).toBe("GL-001 · 40 ft high cube · Used Blue-grey");
  });

  it("describes a 20 ft high cube even though it has no product page of its own", () => {
    const s = unitSpecs(getUnit("GL-016")!);
    expect(s).toMatchObject({ shortName: "20 ft high cube", heightLabel: "9'6\" tall", insideHeight: "8 ft 10 in", specsHref: "/containers/20-ft-shipping-containers" });
  });
});

describe("unit on a quote request", () => {
  const base = {
    ...emptyInquiry("quote"),
    inquiryType: "buy",
    containerSize: "40-high-cube",
    quantity: "1",
    deliveryZip: "48042",
    timeframe: "asap",
    name: "Pat Example",
    email: "pat@example.com",
    phone: "(313) 555-0142",
    consent: true,
  };

  it("keeps known unit IDs and drops unknown or malformed ones", () => {
    expect(normalize({ ...base, unitId: "gl-004" }).unitId).toBe("GL-004");
    expect(normalize({ ...base, unitId: "GL-999" }).unitId).toBe("");
    expect(normalize({ ...base, unitId: "<script>" }).unitId).toBe("");
  });

  it("drops the unit when the request isn't for a container", () => {
    expect(toInquiry({ ...base, inquiryType: "question", unitId: "GL-004" }).unitId).toBe("");
  });

  it("names the unit in the email subject and body", () => {
    const i = toInquiry(normalize({ ...base, unitId: "GL-004" }));
    expect(buildSubject(i)).toBe("New Website Inquiry — Great Lakes Shipping Containers | Buy: 1 × 40 ft high cube · Unit GL-004 · ZIP 48042");
    expect(buildText(i, "REF")).toContain("Inventory unit: GL-004 · 40 ft high cube · Used Blue");
    expect(buildText(i, "REF")).toContain("/inventory#gl-004");
  });
});
