import { database } from "../helpers";

/**
 * Creates a New Company
 * @param name Name of Company
 * @returns Promise of a Company Object
 */
export const insertCompanyRecord = async (
  name: string,
  imageId: number | undefined
) => {
  const company = await database.company.create({ data: { name, imageId } });
  return company;
};

export const editCompanyRecord = async (
  id: number,
  name: string,
  imageId: number
) => {
  const updated = await database.company.update({
    where: {
      id,
    },
    data: {
      name,
      imageId,
    },
  });

  return updated;
};

export const getCompanyRecord = async (id: number) => {
  return await database.company.findUnique({
    where: { id },
  });
};
