import { Request, Response, NextFunction } from "express";
import { insertArtistRecord } from "../services";
export const getArtists = (req: Request, res: Response) => {
  res.send({ msg: "artist" });
};

// Create Artist

export const handleCreateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupId, companyId, name, imageId } = req.body;
  try {
    const data = await insertArtistRecord(name, groupId, companyId, imageId);

    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
};
// Edit Artist
