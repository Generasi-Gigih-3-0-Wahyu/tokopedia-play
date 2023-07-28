import express from "express";
import validateResource from "../middleware/validateResource";
import {
  addProductToVideoSchema,
  createVideoSchema,
  getVideoByIdSchema,
} from "../schema/video.schema";
import {
  addProductToVideoController,
  createVideoController,
  getCommentsByVideoIdController,
  getProductsByVideoIdController,
  getVideoByIdController,
  getVideosController,
} from "../controllers/video.controller";

const router = express.Router();

router.post("/", validateResource(createVideoSchema), createVideoController);
router.get("/", getVideosController);
router.get(
  "/:videoId",
  validateResource(getVideoByIdSchema),
  getVideoByIdController
);
router.post(
  "/:videoId/products",
  validateResource(addProductToVideoSchema),
  addProductToVideoController
);
router.get(
  "/:videoId/products",
  validateResource(getVideoByIdSchema),
  getProductsByVideoIdController
);
router.get("/:videoId/comments", validateResource(getVideoByIdSchema), getCommentsByVideoIdController);

export default router;
