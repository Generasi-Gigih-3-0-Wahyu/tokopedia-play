import express, { Request, Response } from "express";

const router = express.Router();
const baseURL = "/api/v1";

/**
 * *API endpoint for HealthCheck
 */
router.get(baseURL, (_req: Request, res: Response) => {
  res.send("This server is running!");
});

export default router;
