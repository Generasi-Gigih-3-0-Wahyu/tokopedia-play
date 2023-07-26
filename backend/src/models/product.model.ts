import { prop } from "@typegoose/typegoose";

export class Product {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  imageUrl: string;

  @prop({ required: true })
  price: number;
}
