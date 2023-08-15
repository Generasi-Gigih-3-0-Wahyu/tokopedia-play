import express from "express";
import validateResource from "../middleware/validateResource";
import { createProductSchema } from "../schema/product.schema";
import { createProductController } from "../controllers/product.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post(
  "/",
  [requireUser, validateResource(createProductSchema)],
  createProductController
);

export default router;
