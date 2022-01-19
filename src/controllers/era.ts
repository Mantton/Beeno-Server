import { Request, Response } from "express";

export const postEra = async (req: Request, res: Response) => {
  const { title, groupId } = req.body;

  res.send({ success: true });
};
