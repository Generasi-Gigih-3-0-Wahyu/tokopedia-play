import { getModelForClass } from "@typegoose/typegoose";
import { Comment } from "./comment.model";
import { Product } from "./product.model";
import { Video } from "./video.model";

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    timestamps: true,
  },
});

export const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
  },
});

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
