import express from "express";
import validateResource from "../middleware/validateResource";
import {
  addProductToVideoSchema,
  createVideoSchema,
} from "../schema/video.schema";
import {
  addProductToVideoController,
  createVideoController,
} from "../controllers/video.controller";

const router = express.Router();

router.post("/", validateResource(createVideoSchema), createVideoController);
router.post(
  "/:videoId/products",
  validateResource(addProductToVideoSchema),
  addProductToVideoController
);

export default router;
