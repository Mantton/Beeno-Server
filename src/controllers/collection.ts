import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "../config/constants";
import {
  deleteCollectionRecord,
  fetchCollectionRecord,
  insertCollectionRecord,
} from "../database/collection";

export async function handleCreateCollection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, eraId } = req.body;
  try {
    const data = await insertCollectionRecord(title, eraId);
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}

export async function handleDeleteCollection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!parseInt(id)) {
    return res.status(400).send(BAD_REQUEST);
  }
  try {
    let collection = await fetchCollectionRecord(parseInt(id));
    if (!collection) {
      res.status(400).send(BAD_REQUEST);
    }
    try {
      collection = await deleteCollectionRecord(parseInt(id));
      res.send({ collection, deleted: true });
    } catch (err) {
      res.status(400).send({ msg: "Collection is still populated" });
    }
  } catch (err) {
    next(err);
  }
}
