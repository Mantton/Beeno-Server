import { NextFunction, Request, Response } from "express";
import {
  fetchCardCountForSet,
  fetchCardSetArtists,
  fetchCardSetRecord,
  fetchRarityRecord,
  insertCardSetRecord,
  insertCardsForCardSet,
} from "../services";
import { getIterations } from "../utils";

export async function handleCreateCollection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // ! TODO, data should be validated before this point
  const { title, collectionId, rarityId, imageId, artistIds } = req.body;
  try {
    const set = await insertCardSetRecord(
      title,
      collectionId,
      rarityId,
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

    // Fetch Set with id
    const set = await fetchCardSetRecord(setId);
    if (!set) {
      res.status(400).send({ msg: "bad request, card set not found" });
      return;
    }

    // Create Cards
    const rarity = await fetchRarityRecord(set.rarityId);
    if (!rarity) throw "ERR_RARITY_DNE"; // Should never happen but to be safe
    const iterations = getIterations(rarity.label);

    const cardsCreated = await insertCardsForCardSet(set.id, iterations);

    res.send({ data: { set, count: cardsCreated } });
  } catch (err) {
    next(err);
  }
}
