import { TypeOf, object, string } from "zod";

export const createCommentSchema = object({
  body: object({
    comment: string({ required_error: "Comment is required" }),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>["body"];
