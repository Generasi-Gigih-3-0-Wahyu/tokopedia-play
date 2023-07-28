import { NextFunction, Request, Response } from "express";
import { CreateCommentInput } from "../schema/comment.schema";
import { createComment } from "../services/comment.service";
import { success } from "../utils/baseResponse";
import createHttpError from "http-errors";

export async function createCommentController(
  req: Request<CreateCommentInput["params"], unknown, CreateCommentInput["body"]>,
  res: Response,
  next: NextFunction
) {
  const params = req.params;
  const body = req.body;
  try {
    const comment = await createComment({ user: res.locals.user._id, ...body }, params.videoId);
    if (!comment) {
      return next(createHttpError(500, "Error creating comment"))
    }
    return res
      .status(201)
      .json(success("Successfully created comment", comment, res.statusCode));
  } catch (err: any) {
    next(err);
  }
}
