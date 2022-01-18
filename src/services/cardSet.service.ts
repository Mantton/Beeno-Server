import { database } from "../helpers/prisma";

export const insertCardSetRecord = async (
  title: string,
  eraId: number,
  rarityId: number,
  imageId: number
) => {
  return await database.cardSet.create({
    data: {
      title,
      eraId,
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
