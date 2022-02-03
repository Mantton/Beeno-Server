import { Request, Response, NextFunction } from "express";
import { getArtistRecord, insertArtistRecord } from "../services";

// Create Artist

export const handleCreateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupIds, companyId, name, imageId } = req.body;
  try {
    const data = await insertArtistRecord(name, groupIds, companyId, imageId);

    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
};
// Edit Artist

export const handleGetArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const data = await getArtistRecord(parseInt(id));

    if (!data) {
      res.status(404).send({ msg: "not found" });
      return;
    }

    res.send({ data });
  } catch (err) {
    next(err);
  }
};
