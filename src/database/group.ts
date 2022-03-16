import { database } from "../helpers";
import { ARTIST_SELECT, IMAGE_SELECT } from "./prisma_select";
export const insertGroupRecord = async (
  name: string,
  companyId: number,
  bannerImageId: number | undefined = undefined,
  logoImageId: number | undefined = undefined
) => {
  return await database.group.create({
    data: { name, companyId, bannerImageId, logoImageId },
    include: { bannerImage: true, logoImage: true },
  });
};

export const getGroupRecord = async (id: number) => {
  return await database.group.findUnique({
    where: {
      id,
    },

    select: {
      bannerImage: {
        select: IMAGE_SELECT,
      },
      logoImage: {
        select: IMAGE_SELECT,
      },
      id: true,
      name: true,
      company: {
        select: {
          id: true,
          name: true,
          image: {
            select: IMAGE_SELECT,
          },
        },
      },
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
            select: ARTIST_SELECT,
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
      bannerImage: true,
      logoImage: true,
    },
  });
};
