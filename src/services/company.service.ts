import { database } from "../helpers/prisma";

/**
 * Creates a New Company
 * @param name Name of Company
 * @returns Promise of a Company Object
 */
export const insertCompanyRecord = async (name: string) => {
  const company = await database.company.create({ data: { name } });
  return company;
};

export const getCompanyRecord = async (id: number) => {
  return await database.company.findUnique({
    where: { id },
  });
};
