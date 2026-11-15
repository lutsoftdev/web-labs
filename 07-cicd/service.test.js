import { test } from "node:test";
import assert from "node:assert/strict";
import { add } from "./service.js";

test("add success", () => {
  assert.equal(add(2, 3), 5);
});

test("add with zero", () => {
  assert.equal(add(0, 7), 7);
});
