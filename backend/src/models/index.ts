import { getModelForClass } from "@typegoose/typegoose";
import { Comment } from "./comment.model";

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    timestamps: true,
  },
});
