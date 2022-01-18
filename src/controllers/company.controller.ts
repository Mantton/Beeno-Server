import { Request, Response } from "express";

export const postCompany = async (req: Request, res: Response) => {
  const { name } = req.body;

  res.send({ success: true });
};
