import { database } from "../helpers/prisma";

export const insertArtistRecord = async (
  name: string,
  groupId: number | null,
  companyId: number,
  imageId: number
) => {
  return await database.artist.create({
    data: {
      name,
      groupId,
      companyId,
      imageId,
    },
  });
};
