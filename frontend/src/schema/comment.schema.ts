import { TypeOf, object, string } from 'zod';

export const createCommentSchema = object({
  comment: string({ required_error: 'Comment required' }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
