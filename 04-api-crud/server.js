import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import productsRouter from "./api/productsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const rid = req.get("X-Request-Id") || randomUUID();
  req.rid = rid;
  res.setHeader("X-Request-Id", rid);
  next();
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/products", productsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SoftShop CRUD → http://localhost:${PORT}`));
