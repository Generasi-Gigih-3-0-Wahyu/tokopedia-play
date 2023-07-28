import { Ref, prop } from "@typegoose/typegoose";
import { Product } from "./product.model";
import { Comment } from "./comment.model";

export class Video {
  @prop({required: true})
  title: string;

  @prop({ required: true })
  thumbnailUrl: string;

  @prop({ required: true })
  url: string;

  @prop({ ref: () => Comment, default: [] })
  comments: Ref<Comment>[];

  @prop({ ref: () => Product, default: [] })
  products: Ref<Product>[];
}
