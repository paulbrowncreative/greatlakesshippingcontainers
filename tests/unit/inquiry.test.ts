import { describe, expect, it } from "vitest";
import { emptyInquiry, normalize, toInquiry, validate, type InquiryInput } from "@/lib/inquiry";

const validQuote = (over: Partial<InquiryInput> = {}): InquiryInput => ({
  ...emptyInquiry("quote"),
  inquiryType: "buy",
  containerSize: "40-high-cube",
  quantity: "2",
  deliveryZip: "48226",
  timeframe: "1-month",
  name: "Pat Example",
  email: "pat@example.com",
  phone: "(313) 555-0142",
  consent: true,
  ...over,
});

describe("validate", () => {
  it("accepts a complete quote", () => {
    expect(validate(validQuote())).toEqual({});
  });

  it("requires project, delivery and contact fields for a purchase quote", () => {
    const e = validate({ ...emptyInquiry("quote"), inquiryType: "buy", quantity: "" });
    expect(Object.keys(e).sort()).toEqual(
      ["consent", "containerSize", "deliveryZip", "email", "name", "phone", "quantity", "timeframe"].sort(),
    );
  });

  it("does not require container or delivery fields for a general question", () => {
    const e = validate(validQuote({ inquiryType: "question", containerSize: "", deliveryZip: "", timeframe: "" }));
    expect(e).toEqual({});
  });

  it("rejects options that are not offered (rental disabled by default)", () => {
    expect(validate(validQuote({ inquiryType: "rent" })).inquiryType).toBeTruthy();
    expect(validate(validQuote({ containerSize: "45-pallet-wide" })).containerSize).toBeTruthy();
  });

  it.each([
    ["deliveryZip", "4822"],
    ["deliveryZip", "ABCDE"],
    ["quantity", "0"],
    ["quantity", "51"],
    ["quantity", "1.5"],
    ["email", "not-an-email"],
    ["email", "a@b"],
    ["phone", "555-0142"],
  ] as const)("rejects invalid %s: %s", (field, value) => {
    expect(validate(validQuote({ [field]: value }))[field]).toBeTruthy();
  });

  it("accepts ZIP+4", () => {
    expect(validate(validQuote({ deliveryZip: "48226-1234" })).deliveryZip).toBeUndefined();
  });

  it("contact form needs a message but not a phone", () => {
    const base = { ...emptyInquiry("contact"), name: "Pat", email: "pat@example.com", consent: true };
    expect(validate({ ...base, message: "hi" }).message).toBeTruthy();
    expect(validate({ ...base, message: "Do you sell 45 ft containers?" })).toEqual({});
  });

  it("flags link-stuffed messages", () => {
    expect(validate(validQuote({ message: "http://a.com http://b.com www.c.com" })).message).toBeTruthy();
  });
});

describe("normalize", () => {
  it("trims, strips control characters and caps length", () => {
    const n = normalize({ name: "  Pat\u0000 \u0007Example  ", message: "x".repeat(5000), email: " PAT@Example.com " });
    expect(n.name).toBe("Pat Example");
    expect(n.email).toBe("pat@example.com");
    expect(n.message.length).toBe(3000);
  });

  it("never throws on garbage input", () => {
    for (const raw of [null, undefined, 42, "str", [], { name: { nested: true } }]) {
      expect(() => normalize(raw)).not.toThrow();
    }
  });

  it("only accepts boolean-ish consent", () => {
    expect(normalize({ consent: "yes" }).consent).toBe(false);
    expect(normalize({ consent: true }).consent).toBe(true);
  });
});

describe("toInquiry", () => {
  it("drops project fields from general questions", () => {
    const i = toInquiry(validQuote({ inquiryType: "question" }));
    expect(i.quantity).toBeNull();
    expect(i.deliveryZip).toBe("");
  });
});
