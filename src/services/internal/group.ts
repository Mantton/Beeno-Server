import { database } from "../../helpers";
export const insertGroupRecord = async (name: string, companyId: number) => {
  return await database.group.create({ data: { name, companyId } });
};

export const getGroupRecord = async (id: number) => {
  return await database.group.findUnique({
    where: {
      id,
    },
  });
};

export const getGroupRecordsForCompany = async (companyId: number) => {
  return await database.group.findMany({
    where: { companyId },
  });
};
