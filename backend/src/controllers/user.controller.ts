import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";
import { success } from "../utils/baseResponse";
import createHttpError from "http-errors";

export async function createUserController(
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res
      .status(201)
      .json(success("Successfully Created User", user, res.statusCode));
  } catch (err: any) {
    if (err.code === 11000) {
      next(createHttpError(409, "Account already exists"));
    }
    next(err);
  }
}

export async function getCurrentUserController(_req: Request, res: Response) {
  return res
    .status(200)
    .json(
      success("Succesfully Get Current User", res.locals.user, res.statusCode)
    );
}
