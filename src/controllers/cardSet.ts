import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "../config/constants";
import {
  deleteCardSetRecord,
  fetchCardCountForSet,
  fetchCardSetArtists,
  fetchCardSetRecord,
  insertCardSetRecord,
} from "../database";
import { assignRarity, deleteCardSet } from "../services";

export async function handleCreateCardSet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { collectionId, imageId, artistIds } = req.body;
  try {
    const rarity = await assignRarity();
    const set = await insertCardSetRecord(
      collectionId,
      rarity,
      imageId,
      artistIds
    );

    const artists = await fetchCardSetArtists(set.id);

    const data = { set, artists };
    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
}

export const handleGetCardSet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(400).send(BAD_REQUEST);

  try {
    const data = await fetchCardSetRecord(id);

    res.send({ data });
  } catch (err) {
    next(err);
  }
};

export async function handleDeleteCardSet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    if (!id) return res.status(400).send(BAD_REQUEST);

    const data = await deleteCardSet(id);
    if (!data) return res.status(400).send(BAD_REQUEST);
    res.send({ data, deleted: true });
  } catch (err) {
    next(err);
  }
}

export async function handlePublishCardSet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Essentially Handles *actually* creating the card records
  const setId = req.body.setId;
  try {
    // Check if any cards have been created
    const current = await fetchCardCountForSet(setId);
    if (current == 0) {
      res.send({ msg: "Already Published" });
      return;
    }

    // // Fetch Set with id
    // const set = await fetchCardSetRecord(setId);
    // if (!set) {
    //   res.status(400).send({ msg: "bad request, card set not found" });
    //   return;
    // }

    // // Create Cards
    // const rarity = await fetchRarityRecord(set.rarityId);
    // if (!rarity) throw new Error("ERR_RARITY_DNE"); // Should never happen but to be safe
    // const iterations = getIterations(rarity.label);

    // const cardsCreated = await insertCardsForCardSet(set.id, iterations);

    // res.send({ data: { set, count: cardsCreated } });
  } catch (err) {
    next(err);
  }
}
