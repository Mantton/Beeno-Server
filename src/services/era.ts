import { database } from "../helpers";

export const insertEraRecordForGroup = async (
  title: string,
  groupId: number,
  imageId: number,
  startDate: Date | null = null
) => {
  return await database.era.create({
    data: { title, groupId, startDate, imageId },
  });
};
export const insertEraRecordForSoloArtist = async (
  title: string,
  artistId: number,
  imageId: number,
  startDate: Date | null = null
) => {
  return await database.era.create({
    data: { title, artistId, startDate, imageId },
  });
};

export const getEraRecord = async (id: number) => {
  return await database.era.findUnique({
    where: {
      id,
    },
  });
};

export const getEraRecordsForGroup = async (groupId: number) => {
  return await database.era.findMany({
    where: {
      groupId,
    },
  });
};
