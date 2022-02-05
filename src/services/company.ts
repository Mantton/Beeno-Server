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
        select: {
          base: true,
        },
      },
    },
  });

  return { companies, lastPage: companies.length < take };
};

export const getCompanyRecord = async (id: number) => {
  return await database.company.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      groups: {
        select: {
          id: true,
          image: {
            select: {
              base: true,
            },
          },
          name: true,
        },
      },
      image: {
        select: {
          base: true,
        },
      },
    },
  });
};
