import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(join(__dirname, "shop.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
  DELETE FROM items;
`);

const insert = db.prepare("INSERT INTO items (name) VALUES (?)");
["Ноутбук Lenovo", "Навушники Sony", "Мишка Logitech", "Клавіатура Keychron"].forEach((name) =>
  insert.run(name)
);

console.log("DB ready:", db.prepare("SELECT * FROM items").all());
db.close();
