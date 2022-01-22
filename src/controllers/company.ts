import { NextFunction, Request, Response } from "express";
import {
  editCompanyRecord,
  getCompanyRecords,
  insertCompanyRecord,
} from "../services";

export const handleCreateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.account) {
    res.status(401).send({ msg: "unauthorized", success: false });
    return;
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
export async function handleGetCompanyRecords(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, sort } = req.query;

    if (typeof page === "string" && typeof sort === "string") {
      const data = await getCompanyRecords(
        parseInt(page) ?? 1,
        parseInt(sort) ?? 0
      );

      res.send(data);
      return;
    }

    res.status(400).send({ msg: "bad request" });
  } catch (err) {
    next(err);
  }
}
