import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createProduct,
  getProduct,
  _resetForTests,
} from "./productService.js";

test("createProduct success", () => {
  _resetForTests();
  const p = createProduct({ name: "USB-C cable", price: 199, stock: 10 });
  assert.equal(p.name, "USB-C cable");
  assert.ok(p.id.startsWith("p-"));
  assert.equal(getProduct(p.id).price, 199);
});

test("createProduct fails without name", () => {
  _resetForTests();
  assert.throws(() => createProduct({ price: 10 }), (err) => {
    assert.equal(err.code, "NAME_REQUIRED");
    assert.equal(err.status, 400);
    return true;
  });
});
