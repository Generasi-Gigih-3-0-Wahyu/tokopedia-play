import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";
import {
  createSessionController,
  refreshAccessTokenController,
} from "../controllers/session.controller";

const router = express.Router();

router.post(
  "/",
  validateResource(createSessionSchema),
  createSessionController
);
router.post("/refresh", refreshAccessTokenController);

export default router;
