import { RequestHandler } from "express";
import { BAD_REQUEST } from "../config/constants";
import { insertEraRecordForGroup } from "../database/era";
import { getEra } from "../services/era";

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
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).send(BAD_REQUEST);
    return;
  }

  try {
    const era = await getEra(id);

    res.send(era);
  } catch (err) {
    next(err);
  }
};

export const handleGetErasForGroup: RequestHandler = async (req, res, next) => {
  //
};
