import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleInquiry } from "@/lib/server/handle-inquiry";
import { resetGuardsForTests } from "@/lib/server/guards";

const body = (over: Record<string, unknown> = {}) => ({
  formType: "quote",
  inquiryType: "buy",
  containerSize: "20-standard",
  quantity: "1",
  deliveryZip: "48226",
  timeframe: "asap",
  name: "Pat Example",
  email: "pat@example.com",
  phone: "3135550142",
  consent: true,
  startedAt: Date.now() - 60_000,
  website: "",
  ...over,
});

const req = (data: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost:3000/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3000", host: "localhost:3000", "x-forwarded-for": "203.0.113.9", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  resetGuardsForTests();
  process.env.RESEND_API_KEY = "re_test";
  process.env.INQUIRY_FROM_EMAIL = "Website <quotes@glsc-mi.com>";
  delete process.env.INQUIRY_TO_EMAIL;
  delete process.env.TURNSTILE_SECRET_KEY;
  fetchMock = vi.fn(async () => Response.json({ id: "email_123" }));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.unstubAllGlobals());

describe("handleInquiry", () => {
  it("sends to chris@stierenterprise.com with visitor as reply-to and returns a reference", async () => {
    const res = await handleInquiry(req(body()));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.reference).toMatch(/^GLSC-\d{8}-[A-Z0-9]{6}$/);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const sent = JSON.parse(init.body);
    expect(sent.to).toEqual(["chris@stierenterprise.com"]);
    expect(sent.reply_to).toBe("pat@example.com");
    expect(sent.from).toBe("Website <quotes@glsc-mi.com>");
    expect(sent.subject).toMatch(/^New Website Inquiry — Great Lakes Shipping Containers/);
    expect(init.headers["Idempotency-Key"]).toMatch(/^inquiry-/);
  });

  it("rejects cross-origin and origin-less requests", async () => {
    expect((await handleInquiry(req(body(), { origin: "https://evil.example" }))).status).toBe(403);
    const noOrigin = new Request("http://localhost:3000/api/inquiry", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
    expect((await handleInquiry(noOrigin)).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input without sending", async () => {
    const res = await handleInquiry(req(body({ deliveryZip: "12", email: "x" })));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.fields.deliveryZip).toBeTruthy();
    expect(json.fields.email).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const res = await handleInquiry(req(body({ website: "http://spam.example" })));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects submissions completed implausibly fast", async () => {
    const res = await handleInquiry(req(body({ startedAt: Date.now() })));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects oversized and malformed bodies", async () => {
    expect((await handleInquiry(req(body({ message: "x".repeat(30_000) })))).status).toBe(413);
    expect((await handleInquiry(req("{not json"))).status).toBe(400);
  });

  it("does not report success when the provider fails", async () => {
    fetchMock.mockResolvedValueOnce(new Response("nope", { status: 500 }));
    const res = await handleInquiry(req(body()));
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it("does not report success on network failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("ECONNRESET"));
    expect((await handleInquiry(req(body()))).status).toBe(502);
  });

  it("returns 503 when email is not configured", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await handleInquiry(req(body()));
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("unavailable");
  });

  it("deduplicates identical submissions", async () => {
    const a = await (await handleInquiry(req(body()))).json();
    const b = await (await handleInquiry(req(body()))).json();
    expect(b.reference).toBe(a.reference);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rate limits bursts per IP", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await handleInquiry(req(body({ message: `Request number ${i}` })))).status);
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(statuses[5]).toBe(429);
  });

  it("enforces Turnstile when configured", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    expect((await handleInquiry(req(body()))).status).toBe(400);
    fetchMock.mockResolvedValueOnce(Response.json({ success: true }));
    expect((await handleInquiry(req(body({ turnstileToken: "tok" })))).status).toBe(200);
  });
});
