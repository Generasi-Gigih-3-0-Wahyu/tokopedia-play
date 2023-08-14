import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";
import { success } from "../utils/baseResponse";
import createHttpError from "http-errors";
import { omit } from "lodash";

export async function createUserController(
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  try {
    const user = await createUser(body);
    const refreshToken = user.refreshToken;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json(success("Successfully Created User", omit(user, "refreshToken"), res.statusCode));
  } catch (err: any) {
    if (err.statusCode === 11000) {
      return next(createHttpError(409, "Account already exists"));
    }
    return next(err);
  }
}

export async function getCurrentUserController(_req: Request, res: Response) {
  return res
    .status(200)
    .json(
      success("Succesfully Get Current User", res.locals.user, res.statusCode)
    );
}
