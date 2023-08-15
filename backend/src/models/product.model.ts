import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Product {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  imageUrl: string;

  @prop({ required: true })
  price: number;

  @prop({ ref: () => User })
  user: Ref<User>;
}
