import { Router } from "express";
import * as service from "../service/productService.js";

const router = Router();

function errorBody(err, requestId) {
  return {
    error: err.message || "Error",
    code: err.code || "ERROR",
    details: err.details || null,
    requestId,
  };
}

router.post("/", (req, res) => {
  try {
    const product = service.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(err.status || 500).json(errorBody(err, req.rid));
  }
});

router.get("/", (_req, res) => {
  res.json(service.listProducts());
});

router.get("/:id", (req, res) => {
  try {
    res.json(service.getProduct(req.params.id));
  } catch (err) {
    res.status(err.status || 500).json(errorBody(err, req.rid));
  }
});

router.put("/:id", (req, res) => {
  try {
    res.json(service.updateProduct(req.params.id, req.body));
  } catch (err) {
    res.status(err.status || 500).json(errorBody(err, req.rid));
  }
});

router.delete("/:id", (req, res) => {
  try {
    service.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json(errorBody(err, req.rid));
  }
});

export default router;
