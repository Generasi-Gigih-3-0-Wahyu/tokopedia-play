import { TypeOf, number, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    imageUrl: string({ required_error: "Image URL is required" }),
    price: number({ required_error: "Price is required" }),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"];
