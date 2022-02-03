import { NextFunction, Request, Response } from "express";
import {
  getGroupRecord,
  getGroupRecordsForCompany,
  insertGroupRecord,
} from "../services";

// Create Group

export async function handleCreateGroup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { companyId, name, imageId } = req.body;

  try {
    const data = await insertGroupRecord(name, companyId, imageId);

    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}
// Edit Group
// Delete Group

// Get Group

export async function handleGetGroup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id || typeof id !== "string" || !parseInt(id)) {
    res.status(400).send({ msg: "bad request" });
    return;
  }

  try {
    const data = await getGroupRecord(parseInt(id));
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}
// Get Groups
export async function handleGetGroups(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO : Make this non-reliant on group id
  // TODO : Add Sorting options for groups like name, era count, favorites etc
  // TODO : Add Paging and Limit Options
  const { companyId } = req.query;

  if (!companyId || typeof companyId !== "string" || !parseInt(companyId)) {
    res.status(400).send({ msg: "bad request" });
    return;
  }
  try {
    const data = await getGroupRecordsForCompany(parseInt(companyId));
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}
