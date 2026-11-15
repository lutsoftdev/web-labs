import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

const idemStore = new Map();
const rate = new Map();
const WINDOW_MS = 10_000;
const MAX_REQ = 8;
const now = () => Date.now();

app.use((req, res, next) => {
  const rid = req.get("X-Request-Id") || randomUUID();
  req.rid = rid;
  res.setHeader("X-Request-Id", rid);
  next();
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/orders") && req.path !== "/health") {
    return next();
  }
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local";
  const b = rate.get(ip) ?? { count: 0, ts: now() };
  const within = now() - b.ts < WINDOW_MS;
  const state = within ? { count: b.count + 1, ts: b.ts } : { count: 1, ts: now() };
  rate.set(ip, state);
  if (state.count > MAX_REQ && req.path.startsWith("/orders")) {
    res.setHeader("Retry-After", "2");
    return res.status(429).json({
      error: "too_many_requests",
      code: null,
      details: null,
      requestId: req.rid,
    });
  }
  next();
});

app.use(async (req, res, next) => {
  if (process.env.CHAOS === "0" || req.path === "/health" || req.method === "GET") return next();
  const r = Math.random();
  if (r < 0.15) await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));
  if (r > 0.85) {
    const unavailable = Math.random() < 0.5;
    const code = unavailable ? 503 : 500;
    return res.status(code).json({
      error: unavailable ? "unavailable" : "unexpected",
      code: null,
      details: null,
      requestId: req.rid,
    });
  }
  next();
});

app.post("/orders", (req, res) => {
  const key = req.get("Idempotency-Key");
  if (!key) {
    return res.status(400).json({
      error: "idempotency_key_required",
      code: "IDEM_REQUIRED",
      details: null,
      requestId: req.rid,
    });
  }
  if (idemStore.has(key)) {
    return res.status(201).json({ ...idemStore.get(key), requestId: req.rid });
  }
  const order = {
    id: "ord_" + randomUUID().slice(0, 8),
    title: req.body?.title ?? "Untitled order",
  };
  idemStore.set(key, order);
  return res.status(201).json({ ...order, requestId: req.rid });
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`SoftShop resilience → http://localhost:${PORT}`));
