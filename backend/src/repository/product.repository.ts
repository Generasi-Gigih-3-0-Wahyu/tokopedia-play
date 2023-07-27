import { ProductModel } from "../models";
import { Product } from "../models/product.model";

export function createProductRepository(input: Partial<Product>) {
  return ProductModel.create(input);
}

export function findProductById(id: string) {
  return ProductModel.findById(id);
}

export function findProdutsByIds(ids: string[]) {
  return ProductModel.find({ _id: { $in: ids } });
}
