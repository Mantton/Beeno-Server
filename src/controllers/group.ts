import { NextFunction, Request, Response } from "express";
import { insertGroupRecord } from "../services";

export const postGroup = async (req: Request, res: Response) => {
  const { name, companyId } = req.body;

  res.send({ success: true });
};

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
