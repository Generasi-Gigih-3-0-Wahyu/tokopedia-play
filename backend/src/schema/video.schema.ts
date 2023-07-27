import { TypeOf, object, string } from "zod";

export const createVideoSchema = object({
  body: object({
    thumbnailUrl: string({ required_error: "Thumbnail URL is required" }),
    url: string({ required_error: "URL is required" }),
    products: string().array().optional(),
  }),
});

export const addProductToVideoSchema = object({
  params: object({
    videoId: string({ required_error: "Video ID is required" }),
  }),
  body: object({
    products: string({ required_error: "Product is required" }).array(),
  }),
});

export type CreateVideoInput = TypeOf<typeof createVideoSchema>["body"];
export type AddProductToVideoInput = TypeOf<typeof addProductToVideoSchema>;
