import { NextFunction, Request, Response } from "express";
import {
  AddProductToVideoInput,
  CreateVideoInput,
} from "../schema/video.schema";
import { addProductToVideo, createVideo } from "../services/video.service";
import { success } from "../utils/baseResponse";
import createHttpError from "http-errors";

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
