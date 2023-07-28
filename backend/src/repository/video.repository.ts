import { DocumentType } from "@typegoose/typegoose";
import { VideoModel } from "../models";
import { Product } from "../models/product.model";
import { ClientSession } from "mongoose";
import { Comment } from "../models/comment.model";
import { ErrorBase } from "../utils/error";

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

export async function updateVideoComment(
  videoId: string,
  comment: DocumentType<Comment>[],
  session: ClientSession
) {
  try {
    const video = await VideoModel.findByIdAndUpdate(videoId, {
      $push: { comments: { $each: comment } },
    }).session(session);
    if (video === null) {
      throw new ErrorBase({ statusCode: 404, message: "Invalid video id" });
    }
    return video;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function updateVideoProduct(
  videoId: string,
  products: DocumentType<Product>[]
) {
  try {
    const video = VideoModel.findByIdAndUpdate(videoId, {
      $push: { products: { $each: products } },
    });
    return video;
  } catch (err: any) {
    throw new Error(err);
  }
}
