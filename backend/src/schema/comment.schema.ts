import { TypeOf, object, string } from "zod";

export const createCommentSchema = object({
  params: object({
    videoId: string({ required_error: "Video ID is required" }),
  }),
  body: object({
    comment: string({ required_error: "Comment is required" }),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
