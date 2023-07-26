import { CommentModel } from "../models";
import { Comment } from "../models/comment.model";

export function createCommentRepository(input: Partial<Comment>) {
  return CommentModel.create(input);
}
