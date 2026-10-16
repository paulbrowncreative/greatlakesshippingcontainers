// Minimal stand-in for the Resend REST API used by e2e tests (never used in production).
import { createServer } from "node:http";

const sent = [];
const port = Number(process.env.MOCK_RESEND_PORT || 3999);

createServer((req, res) => {
  if (req.method === "GET" && req.url === "/__sent") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(sent));
  }
  if (req.method === "POST" && req.url === "/emails") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const body = JSON.parse(raw);
      if (String(body.text).includes("SIMULATE_PROVIDER_FAILURE")) {
        res.writeHead(500, { "content-type": "application/json" });
        return res.end(JSON.stringify({ message: "simulated" }));
      }
      sent.push({ body, auth: req.headers.authorization, idempotencyKey: req.headers["idempotency-key"] });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ id: `mock_${sent.length}` }));
    });
    return;
  }
  res.writeHead(404).end();
}).listen(port, () => console.log(`mock resend on ${port}`));
