import { Prisma } from "@prisma/client";
import { database } from "../helpers";
import { ERA_SELECT } from "./prisma_select";

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
    select: ERA_SELECT,
  });
};

export const getEraRecordsForGroup = async (groupId: number) => {
  return await database.era.findMany({
    where: {
      groupId,
    },
    select: ERA_SELECT,
  });
};

export const deleteEraRecord = async (id: number) => {
  const era = await database.era.findFirst({
    where: {
      id,
    },
  });

  if (!era) return null;
  return await database.era.delete({
    where: {
      id,
    },
  });
};
