import { describe, expect, it } from "vitest";
import { buildHtml, buildSubject, buildText, escapeHtml } from "@/lib/server/email-template";
import { emptyInquiry, toInquiry } from "@/lib/inquiry";

const inquiry = toInquiry({
  ...emptyInquiry("quote"),
  inquiryType: "buy",
  containerSize: "40-standard",
  quantity: "3",
  deliveryZip: "49503",
  timeframe: "asap",
  name: "<script>alert(1)</script>",
  email: "pat@example.com",
  phone: "313-555-0142",
  message: 'Line one\n<img src=x onerror="x">',
  consent: true,
  sourcePage: "/containers",
});

describe("email template", () => {
  it("escapes HTML", () => {
    expect(escapeHtml(`<a href="x">'&`)).toBe("&lt;a href=&quot;x&quot;&gt;&#39;&amp;");
    const html = buildHtml(inquiry, "GLSC-20261016-ABC123");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
  });

  it("builds a descriptive subject with the required prefix", () => {
    expect(buildSubject(inquiry)).toBe("New Website Inquiry — Great Lakes Shipping Containers | Buy: 3 × 40 ft standard · ZIP 49503");
  });

  it("subject never contains line breaks", () => {
    const s = buildSubject({ ...inquiry, formType: "contact", quantity: null, name: "Evil\r\nBcc: x@y.com" });
    expect(s).not.toMatch(/[\r\n]/);
  });

  it("text body includes key details and reference", () => {
    const t = buildText(inquiry, "GLSC-20261016-ABC123");
    expect(t).toContain("Delivery ZIP: 49503");
    expect(t).toContain("Quantity: 3");
    expect(t).toContain("GLSC-20261016-ABC123");
  });
});
