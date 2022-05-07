import { NextFunction, Request, Response } from "express";
import { insertCardRecord } from "../database";

export async function handleCreateCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { eraId, setId, imageId, artistIds } = req.body;
  try {
    const card = await insertCardRecord(eraId, setId, imageId, artistIds);

    // const artists = await fetchCardSetArtists(set.id);

    // const data = { set, artists };
    res.send({ card, success: true });
  } catch (err) {
    next(err);
  }
}
