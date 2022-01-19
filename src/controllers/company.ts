import { NextFunction, Request, Response } from "express";
import { insertCompanyRecord } from "../services";

export const postCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.account) {
    res.status(401).send({ msg: "unauthorized", success: false });
  }
  const { name, imageId } = req.body;

  try {
    const data = await insertCompanyRecord(name, imageId);
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
};
