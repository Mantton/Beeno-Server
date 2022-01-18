import { Request, Response } from "express";

export const postGroup = async (req: Request, res: Response) => {
  const { name, companyId } = req.body;

  res.send({ success: true });
};
