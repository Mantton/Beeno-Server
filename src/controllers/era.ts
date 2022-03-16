import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "../config/constants";
import {
  deleteEraRecord,
  getEraRecordsForGroup,
  insertEraRecordForGroup,
} from "../database";
import { getEra } from "../services/era";

export async function handleCreateEraForGroup(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
}

export async function handleGetEraForGroup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  try {
    if (!parseInt) return res.status(400).send({ msg: " =bad request" });
    const data = await getEraRecordsForGroup(parseInt(id));

    res.send({ data });
  } catch (err) {
    next(err);
  }
}

export const handleGetEra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    if (!parseInt) return res.status(400).send({ msg: "bad request" });

    const data = await getEra(parseInt(id));
    res.send(data);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteEra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    if (!id) return res.status(400).send(BAD_REQUEST);

    const data = await deleteEraRecord(id);

    if (!data) return res.status(400).send(BAD_REQUEST);
    res.send(data);
  } catch (err) {
    next(err);
  }
};
