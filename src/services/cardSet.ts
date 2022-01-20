import { database } from "../helpers";

export const insertCardSetRecord = async (
  title: string,
  collectionId: number,
  rarityId: number,
  imageId: number
) => {
  return await database.cardSet.create({
    data: {
      title,
      collectionId,
      rarityId,
      imageId,
    },
  });
};

export const insertCardSetArtistRecord = async (
  artistId: number,
  setId: number
) => {
  return await database.cardSetArtist.create({
    data: {
      artistId,
      setId,
    },
  });
};
