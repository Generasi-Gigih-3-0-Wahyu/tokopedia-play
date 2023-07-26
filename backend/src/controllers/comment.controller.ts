import { NextFunction, Request, Response } from "express";
import { CreateCommentInput } from "../schema/comment.schema";
import { createComment } from "../services/comment.service";
import { success } from "../utils/baseResponse";

export async function createCommentController(
  req: Request<unknown, unknown, CreateCommentInput>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const comment = await createComment({ user: res.locals.user._id, ...body });
    return res
      .status(201)
      .json(success("Successfully created comment", comment, res.statusCode));
  } catch (err: any) {
    next(err);
  }
}
