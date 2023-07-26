import { NextFunction, Request, Response } from "express";
import { CreateSessionInput } from "../schema/session.schema";
import { success } from "../utils/baseResponse";
import {
  signRefreshedAccessToken,
  signToken,
} from "../services/session.service";
import { get } from "lodash";
import createHttpError from "http-errors";

export async function createSessionController(
  req: Request<unknown, unknown, CreateSessionInput>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await signToken(email, password);
    return res
      .status(201)
      .json(
        success(
          "Successfully signed",
          { accessToken, refreshToken },
          res.statusCode
        )
      );
  } catch (err: any) {
    next(createHttpError(err.statusCode, err.message));
  }
}

export async function refreshAccessTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = get(req, "headers.x-refresh")?.toString();

  if (!refreshToken) {
    return next(createHttpError(401, "Could not refresh access token"));
  }

  try {
    const accessToken = await signRefreshedAccessToken(refreshToken)
    return res.status(201).json(success("Successfully refreshed access token", {accessToken: accessToken}, res.statusCode));
  } catch (err: any) {
    next(createHttpError(err.statusCode, err.message))
  }
}
