import { RequestHandler } from "express";
import { insertEraRecordForGroup } from "../database/era";

export const handleCreateEraForGroup: RequestHandler = async (
  req,
  res,
  next
) => {
  const { title, startDate, groupId, imageId } = req.body;
  try {
    const data = await insertEraRecordForGroup(
      title,
      groupId,
      imageId,
      startDate
    );
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
};

export const handleGetEra: RequestHandler = async (req, res, next) => {
  //
};
