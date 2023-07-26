import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Comment {
  @prop({ required: true })
  comment: string;

  @prop({ref: () => User})
  user: Ref<User>
}
