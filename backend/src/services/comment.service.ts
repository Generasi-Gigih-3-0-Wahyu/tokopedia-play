import { Comment } from "../models/comment.model";
import { createCommentRepository } from "../repository/comment.repository";
import { updateVideoComment } from "../repository/video.repository";
import { conn } from "../utils/connectDb";

export async function createComment(input: Partial<Comment>, videoId: string) {
  const session = await conn.startSession();
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
  });
  try {
    const comment = await createCommentRepository(input, session);
    await updateVideoComment(videoId, comment, session);
    await session.commitTransaction();
    return comment;
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err);
  } finally {
    session.endSession();
  }
}
