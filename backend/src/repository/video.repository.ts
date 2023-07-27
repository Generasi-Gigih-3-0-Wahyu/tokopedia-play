import { DocumentType } from "@typegoose/typegoose";
import { VideoModel } from "../models";
import { Product } from "../models/product.model";

export async function createVideoRepository(input: {
  thumbnailUrl: string;
  url: string;
  products?: DocumentType<Product>[];
}) {
  return VideoModel.create(input);
}

export async function findVideoById(id: string) {
  return VideoModel.findById(id);
}

export async function findVideoByIdAndUpdate(
  id: string,
  products: DocumentType<Product>[]
) {
  return VideoModel.findByIdAndUpdate(
    { _id: id },
    { products: products },
    { new: true }
  );
}
