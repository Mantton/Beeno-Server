import database from "../helpers/prisma";

export const createArtist = async (
  name: string,
  groupId: string | null,
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
