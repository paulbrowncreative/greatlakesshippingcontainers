import { describe, expect, it } from "vitest";
import { recommend } from "@/components/ContainerChooser";

describe("size chooser", () => {
  it("recommends a 20 for tight sites", () => {
    expect(recommend({ use: "household", amount: "small", space: "tight" }).sizeParam).toBe("20-standard");
  });
  it("recommends a high cube for tall equipment", () => {
    expect(recommend({ use: "tall", amount: "medium", space: "open" }).sizeParam).toBe("40-high-cube");
  });
  it("recommends a 40 for larger volumes", () => {
    expect(recommend({ use: "inventory", amount: "large", space: "open" }).sizeParam).toBe("40-standard");
  });
});
