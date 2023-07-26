import { getModelForClass } from "@typegoose/typegoose";
import { Comment } from "./comment.model";
import { Product } from "./product.model";

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
