import { NextFunction, Request, Response } from "express";
import { CreateSessionInput } from "../schema/session.schema";
import { success } from "../utils/baseResponse";
import {
  signRefreshedAccessToken,
  signToken,
} from "../services/session.service";
import createHttpError from "http-errors";

export async function createSessionController(
  req: Request<unknown, unknown, CreateSessionInput>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken, respUser } = await signToken(email, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json(success("Successfully signed", { respUser, accessToken }, res.statusCode));
  } catch (err: any) {
    next(createHttpError(err.statusCode, err.message));
  }
}

export async function refreshAccessTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    return next(createHttpError(401, "You have no access token"));
  }  

  try {
    const accessToken = await signRefreshedAccessToken(cookie?.refreshToken);
    return res
      .status(201)
      .json(
        success(
          "Successfully refreshed access token",
          { accessToken: accessToken },
          res.statusCode
        )
      );
  } catch (err: any) {
    next(createHttpError(err.statusCode, err.message));
  }
}
