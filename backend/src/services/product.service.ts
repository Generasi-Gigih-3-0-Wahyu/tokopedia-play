import { Product } from "../models/product.model";
import { createProductRepository } from "../repository/product.repository";

export async function createProduct(input: Partial<Product>) {
  try {
    const product = await createProductRepository(input);
    return product;
  } catch (err: any) {
    throw new Error(err);
  }
}
