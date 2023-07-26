import { Comment } from "../models/comment.model";
import { createCommentRepository } from "../repository/comment.repository";

export async function createComment(input: Partial<Comment>) {
  try {
    const comment = await createCommentRepository(input);
    return comment;
  } catch (err: any) {
    throw new Error(err);
  }
}
