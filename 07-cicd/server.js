import express from "express";
import { add } from "./service.js";

const app = express();
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/sum", (req, res) => {
  const a = Number(req.query.a || 0);
  const b = Number(req.query.b || 0);
  res.json({ result: add(a, b) });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`ci demo :${PORT}`));
