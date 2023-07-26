import express from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import {
  createUserController,
  getCurrentUserController,
} from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserController);
router.get("/me", requireUser, getCurrentUserController);

export default router;
