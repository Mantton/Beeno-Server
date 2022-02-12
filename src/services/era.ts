import { database } from "../helpers";

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
    select: {
      id: true,
      title: true,
      image: {
        select: {
          base: true,
        },
      },
      group: {
        select: {
          id: true,
          name: true,
          image: {
            select: {
              base: true,
            },
          },
          members: {
            select: {
              artist: {
                select: {
                  name: true,
                  id: true,
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
      },

      collections: {
        select: {
          id: true,
          title: true,
          sets: {
            select: {
              id: true,
              created: true,
              artists: {
                select: {
                  artistId: true,
                },
              },
              image: {
                select: {
                  base: true,
                },
              },
              rarity: {
                select: {
                  label: true,
                },
              },
            },
          },
        },
      },
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
