import { database } from "../helpers";
import { COMPANY_SELECT, GROUP_SELECT, IMAGE_SELECT } from "./prisma_select";

/**
 * Creates a New Company
 * @param name Name of Company
 * @returns Promise of a Company Object
 */
export const insertCompanyRecord = async (
  name: string,
  imageId: number | undefined
) => {
  const company = await database.company.create({
    data: { name, imageId },
    select: COMPANY_SELECT,
  });
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
    select: COMPANY_SELECT,
  });

  return updated;
};

export const getCompanyRecords = async (page: number, sort: number) => {
  // TODO: Sorting
  const take = 30;
  const skip = take * (page - 1);
  const companies = await database.company.findMany({
    skip,
    take: 30,
    select: {
      id: true,
      name: true,
      image: {
        select: IMAGE_SELECT,
      },
    },
  });

  return { companies, lastPage: companies.length < take };
};

export const getCompanyRecord = async (id: number) => {
  return await database.company.findUnique({
    where: { id },
    select: COMPANY_SELECT,
  });
};
