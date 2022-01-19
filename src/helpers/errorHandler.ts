import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);

  if (res.headersSent) {
    return;
  }
  res.status(500).send({ msg: "an error occurred", error: err.message ?? err });
};
