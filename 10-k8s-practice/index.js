import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const APP_MESSAGE = process.env.APP_MESSAGE || "SoftShop default";
const API_TOKEN = process.env.API_TOKEN || "missing";

app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/ready", (_req, res) => res.status(200).send("ready"));

app.get("/api/status", (_req, res) => {
  res.json({
    service: "softshop-k8s-demo",
    message: APP_MESSAGE,
    tokenConfigured: API_TOKEN !== "missing",
    tokenPreview: API_TOKEN.slice(0, 3) + "***",
  });
});

app.get("/api/items", (_req, res) => {
  res.json([
    { id: 1, name: "Ноутбук" },
    { id: 2, name: "Мишка" },
  ]);
});

app.listen(PORT, "0.0.0.0", () => console.log(`softshop-k8s on ${PORT}, msg=${APP_MESSAGE}`));
