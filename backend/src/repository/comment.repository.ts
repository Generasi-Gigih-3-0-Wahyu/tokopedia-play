import { ClientSession } from "mongoose";
import { CommentModel } from "../models";
import { Comment } from "../models/comment.model";

export function createCommentRepository(
  input: Partial<Comment>,
  session: ClientSession
) {
  return CommentModel.create([input], { session });
}
