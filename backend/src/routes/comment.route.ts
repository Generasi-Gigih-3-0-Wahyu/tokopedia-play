import express from "express";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createCommentSchema } from "../schema/comment.schema";
import { createCommentController } from "../controllers/comment.controller";

const router = express.Router();

router.post(
  "/:videoId",
  [requireUser, validateResource(createCommentSchema)],
  createCommentController
);

export default router;
