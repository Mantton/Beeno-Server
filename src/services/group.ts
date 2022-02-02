import { database } from "../helpers";
export const insertGroupRecord = async (
  name: string,
  companyId: number,
  imageId: number | undefined = undefined
) => {
  return await database.group.create({ data: { name, companyId, imageId } });
};

export const getGroupRecord = async (id: number) => {
  return await database.group.findUnique({
    where: {
      id,
    },
    include: {
      image: true,
    },
  });
};

export const getGroupRecordsForCompany = async (companyId: number) => {
  return await database.group.findMany({
    where: { companyId },
    include: {
      image: true,
    },
  });
};
