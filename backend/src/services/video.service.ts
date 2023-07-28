import { findProdutsByIds } from "../repository/product.repository";
import {
  createVideoRepository,
  findVideoById,
  findVideos,
  updateVideoProduct,
} from "../repository/video.repository";
import { ErrorBase } from "../utils/error";

export async function createVideo(input: {
  thumbnailUrl: string;
  url: string;
  title: string;
  products?: string[];
}) {
  let products;
  if (input.products) {
    products = await findProdutsByIds(input.products);
  }
  try {
    const video = await createVideoRepository({
      thumbnailUrl: input.thumbnailUrl,
      url: input.url,
      title: input.title,
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

  try {
    const video = await updateVideoProduct(videoId, products);
    if (!video) {
      throw new ErrorBase({ statusCode: 404, message: "Video not found" });
    }
    return video;
  } catch (err: any) {
    throw new ErrorBase({ statusCode: err.statusCode, message: err.message });
  }
}

export async function getVideos() {
  return await findVideos();
}

export async function getVideoById(id: string) {
  return await findVideoById(
    id,
    { path: "comments products", select: { __v: 0 } },
    { __v: 0 }
  );
}

export async function getProductsByVideoId(id: string) {
  return await findVideoById(id, { path: "products", select: { __v: 0 } }, {});
}

export async function getCommentsByVideoId(id: string) {
  return await findVideoById(id, { path: "comments", select: { __v: 0 } }, {});
}
