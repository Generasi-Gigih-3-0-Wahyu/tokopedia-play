import { ProductModel } from "../models";
import { Product } from "../models/product.model";

export function createProductRepository(input: Partial<Product>) {
  return ProductModel.create(input);
}
