import { Request, Response, NextFunction } from "express";
import { insertEraRecord } from "../services";

export const postEra = async (req: Request, res: Response) => {
  const { title, groupId } = req.body;

  res.send({ success: true });
};

export async function handleCreateEra(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, startDate, groupId, artistId } = req.body;
  try {
    const data = await insertEraRecord(title, groupId, artistId, startDate);
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}
