import { NextFunction, Request, Response } from "express";
import { editCompanyRecord, insertCompanyRecord } from "../services";

export const handleCreateCompany = async (
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

export async function handleEditCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, name, imageId } = req.body;

  try {
    const company = await editCompanyRecord(id, name, imageId);
    res.send({
      data: company,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
