import express from "express";
import cors from "cors";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "shop.db");

if (!existsSync(dbPath)) {
  console.log("DB missing — run: npm run init-db");
  process.exit(1);
}

const db = new DatabaseSync(dbPath);
const app = express();
app.use(cors());
app.use(express.static(join(__dirname, "public")));

app.get("/items", (_req, res) => {
  const items = db.prepare("SELECT id, name FROM items").all();
  res.json(items);
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SoftShop lab01 → http://localhost:${PORT}`));
