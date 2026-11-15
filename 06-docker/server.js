import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const products = [
  { id: 1, name: "Ноутбук" },
  { id: 2, name: "Навушники" },
  { id: 3, name: "Мишка" },
];

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/items", (_req, res) => res.json(products));

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`SoftShop docker api :${PORT}`));
