import { database } from "../helpers";
export const insertGroupRecord = async (
  name: string,
  companyId: number,
  imageId: number | undefined = undefined
) => {
  return await database.group.create({
    data: { name, companyId, imageId },
    include: { image: true },
  });
};

export const getGroupRecord = async (id: number) => {
  return await database.group.findUnique({
    where: {
      id,
    },

    select: {
      image: {
        select: {
          base: true,
        },
      },
      id: true,
      name: true,
      companyId: true,
      eras: {
        select: {
          title: true,
          id: true,
          image: {
            select: {
              base: true,
            },
          },
        },
      },
      members: {
        select: {
          artist: {
            select: {
              id: true,
              name: true,

              image: {
                select: {
                  base: true,
                },
              },
            },
          },
        },
      },
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
