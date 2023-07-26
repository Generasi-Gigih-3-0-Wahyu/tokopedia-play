import { NextFunction, Request, Response } from "express";
import { CreateProductInput } from "../schema/product.schema";
import { createProduct } from "../services/product.service";
import { success } from "../utils/baseResponse";

export async function createProductController(
  req: Request<unknown, unknown, CreateProductInput>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const product = await createProduct(body);
    return res
      .status(201)
      .json(success("Successfully created product", product, res.statusCode));
  } catch (err: any) {
    next(err);
  }
}
