import { findProdutsByIds } from "../repository/product.repository";
import {
  createVideoRepository,
  findVideoById,
  findVideoByIdAndUpdate,
} from "../repository/video.repository";
import { ErrorBase } from "../utils/error";

export async function createVideo(input: {
  thumbnailUrl: string;
  url: string;
  products?: string[];
}) {
  let products;
  if (input.products) {
    products = await findProdutsByIds(input.products);
  }
  console.log(products);
  try {
    const video = await createVideoRepository({
      thumbnailUrl: input.thumbnailUrl,
      url: input.url,
      products: products,
    });
    return video;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function addProductToVideo(productIds: string[], videoId: string) {
  const products = await findProdutsByIds(productIds);
  if (products.length === 0) {
    throw new ErrorBase({ statusCode: 404, message: "Product not found" });
  }

  const video = await findVideoById(videoId);
  if (!video) {
    throw new ErrorBase({ statusCode: 404, message: "Video not found" });
  }

  try {
    const video = await findVideoByIdAndUpdate(videoId, products);
    return video;
  } catch (err: any) {
    throw new Error(err);
  }
}
