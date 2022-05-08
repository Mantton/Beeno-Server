import { database } from "../helpers";
import { assignRarity } from "../services";
import { getIterations } from "../utils";

export const insertCardRecord = async (
  eraId: number,
  setId: number | null,
  imageId: number,
  artistIds: number[]
) => {
  if (artistIds.length == 0) throw new Error("ERR_NO_ARTISTS_PROVIDED"); // should never happen as data is validated before here

  // Generate Rarity
  // DB Transaction
  const card = await database.$transaction(async (repo) => {
    // Create Set
    const rarityId = await assignRarity();

    const card = await repo.card.create({
      data: {
        eraId,
        setId,
        rarityId,
        imageId,

        // Artists
        artists: {
          createMany: {
            data: artistIds.map((artistId) => ({ artistId })),
          },
        },
        // Card Items
        items: {
          createMany: {
            // Reference: https://stackoverflow.com/a/33352604
            data: Array.from(
              { length: getIterations(rarityId) },
              (_, i) => i + 1
            ).map((iteration) => ({
              iteration,
            })),
          },
        },
      },
    });

    // Create Items

    return card;
  });

  return card;
};
