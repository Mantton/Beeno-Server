import { database } from "../../helpers";

export const insertEraRecord = async (
  title: string,
  groupId: number,
  startDate: Date | null = null
) => {
  return await database.era.create({ data: { title, groupId, startDate } });
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
