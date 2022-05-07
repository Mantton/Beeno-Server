import { database } from "../helpers";
import { assignRarity } from "../services";

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
      },
    });

    // Query, See : https://www.prisma.io/docs/concepts/components/prisma-client/crud#create-multiple-records
    const dataMap = artistIds.map((id) => ({ artistId: id, cardId: card.id }));

    // Create Artist Records
    await repo.cardArtist.createMany({
      data: dataMap,
    });

    return card;
  });

  return card;
};
