import { NextFunction, Request, Response } from "express";
import { insertCollectionRecord } from "../services/collection";

export async function handleCreateCollection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, eraId } = req.body;
  try {
    const data = await insertCollectionRecord(title, eraId);
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}
