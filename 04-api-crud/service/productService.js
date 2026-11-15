import { randomUUID } from "crypto";
import { Product } from "../domain/Product.js";

const store = new Map();

function now() {
  return new Date().toISOString();
}

export function createProduct(dto) {
  if (!dto?.name || String(dto.name).trim() === "") {
    const err = new Error("Title is required");
    err.code = "NAME_REQUIRED";
    err.status = 400;
    err.details = [{ field: "name", message: "Name is required" }];
    throw err;
  }
  const price = Number(dto.price ?? 0);
  const stock = Number(dto.stock ?? 0);
  if (Number.isNaN(price) || price < 0) {
    const err = new Error("Invalid price");
    err.code = "INVALID_PRICE";
    err.status = 400;
    throw err;
  }
  const id = "p-" + randomUUID().slice(0, 8);
  const ts = now();
  const product = new Product({
    id,
    name: String(dto.name).trim(),
    price,
    stock,
    createdAt: ts,
    updatedAt: ts,
  });
  store.set(id, product);
  return product;
}

export function listProducts() {
  return [...store.values()];
}

export function getProduct(id) {
  const p = store.get(id);
  if (!p) {
    const err = new Error("Not found");
    err.code = "NOT_FOUND";
    err.status = 404;
    throw err;
  }
  return p;
}

export function updateProduct(id, dto) {
  const p = getProduct(id);
  if (dto.name !== undefined) {
    if (String(dto.name).trim() === "") {
      const err = new Error("Name is required");
      err.code = "NAME_REQUIRED";
      err.status = 400;
      throw err;
    }
    p.name = String(dto.name).trim();
  }
  if (dto.price !== undefined) p.price = Number(dto.price);
  if (dto.stock !== undefined) p.stock = Number(dto.stock);
  p.updatedAt = now();
  store.set(id, p);
  return p;
}

export function deleteProduct(id) {
  getProduct(id);
  store.delete(id);
}

export function _resetForTests() {
  store.clear();
}
