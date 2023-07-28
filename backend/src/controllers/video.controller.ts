import { NextFunction, Request, Response } from "express";
import {
  AddProductToVideoInput,
  CreateVideoInput,
  GetVideoByIdInput,
} from "../schema/video.schema";
import {
  addProductToVideo,
  createVideo,
  getCommentsByVideoId,
  getProductsByVideoId,
  getVideoById,
  getVideos,
} from "../services/video.service";
import { success } from "../utils/baseResponse";
import createHttpError from "http-errors";
import { ErrorBase } from "../utils/error";

export async function createVideoController(
  req: Request<unknown, unknown, CreateVideoInput>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const video = await createVideo(body);
    return res
      .status(201)
      .json(success("Successfully created video", video, res.statusCode));
  } catch (err: any) {
    console.log(err);

    next(err);
  }
}

export async function addProductToVideoController(
  req: Request<
    AddProductToVideoInput["params"],
    unknown,
    AddProductToVideoInput["body"]
  >,
  res: Response,
  next: NextFunction
) {
  const params = req.params;
  const body = req.body;

  try {
    const video = await addProductToVideo(body.products, params.videoId);
    return res
      .status(201)
      .json(
        success("Successfully added product to video", video, res.statusCode)
      );
  } catch (err: any) {
    next(createHttpError(err.statusCode, err.message));
  }
}

export async function getVideosController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const videos = await getVideos();
    return res
      .status(200)
      .json(success("Successfully retrieved videos", videos, res.statusCode));
  } catch (err: any) {
    next(createHttpError(500, "Internal Server Error"));
  }
}

export async function getVideoByIdController(
  req: Request<GetVideoByIdInput>,
  res: Response,
  next: NextFunction
) {
  const params = req.params;

  try {
    const video = await getVideoById(params.videoId);
    if (!video) {
      throw new ErrorBase({statusCode: 404, message: "Video not found"})
    }
    return res
      .status(200)
      .json(success("Successfully retrieved video", video, res.statusCode));
  } catch (err: any) {
    next(createHttpError(err.statusCode, err.message));
  }
}

export async function getProductsByVideoIdController(
  req: Request<GetVideoByIdInput>,
  res: Response,
  next: NextFunction
) {
  const params = req.params;

  try {
    const video = await getProductsByVideoId(params.videoId);
    if (!video) {
      throw new ErrorBase({ statusCode: 404, message: "Video not found" });
    }
    return res
      .status(200)
      .json(success("Successfully retrieved video", video.products, res.statusCode));
  } catch (err: any) {
    next(createHttpError(500, "Internal Server Error"));
  }
}

export async function getCommentsByVideoIdController(
  req: Request<GetVideoByIdInput>,
  res: Response,
  next: NextFunction
) {
  const params = req.params;

  try {
    const video = await getCommentsByVideoId(params.videoId);
    if (!video) {
      throw new ErrorBase({ statusCode: 404, message: "Video not found" });
    }
    return res
      .status(200)
      .json(
        success("Successfully retrieved video", video.comments, res.statusCode)
      );
  } catch (err: any) {
    next(createHttpError(500, "Internal Server Error"));
  }
}