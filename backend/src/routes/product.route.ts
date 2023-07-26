import express from "express";
import validateResource from "../middleware/validateResource";
import { createProductSchema } from "../schema/product.schema";
import { createProductController } from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/",
  validateResource(createProductSchema),
  createProductController
);

export default router;
