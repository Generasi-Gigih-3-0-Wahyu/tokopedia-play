import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import { error } from "../utils/baseResponse";
import user from "./user.route";
import session from "./session.route";
import comment from "./comment.route";
import product from "./product.route";
import video from "./video.route";

const router = express.Router();
const baseURL = "/api/v1";

/**
 * *API endpoint for HealthCheck
 */
router.get(baseURL, (_req: Request, res: Response) => {
  res.send("This server is running!");
});

router.use(`${baseURL}/users`, user);
router.use(`${baseURL}/session`, session);
router.use(`${baseURL}/comments`, comment);
router.use(`${baseURL}/products`, product);
router.use(`${baseURL}/videos`, video);

/**
 * *Callback for 404 error handling
 */
router.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

/**
 * *Callback for error handling
 */
router.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(err)) {
      console.error(err);
      statusCode = err.status;
      errorMessage = err.message;
    }
    res.status(statusCode).json(error(errorMessage, statusCode));
  }
);

export default router;
