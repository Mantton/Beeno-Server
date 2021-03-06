import { database } from "../helpers";

export const insertArtistRecord = async (
  name: string,
  groupIds: number[],
  companyId: number,
  imageId: number
) => {
  return database.$transaction(async (repo) => {
    const artist = await repo.artist.create({
      data: {
        name,
        companyId,
        imageId,
      },
    });

    await repo.groupArtist.createMany({
      data: groupIds.map((groupId) => ({ groupId, artistId: artist.id })),
    });

    return artist;
  });
};

export const updateArtistRecord = async (
  id: number,
  data: {
    imageId: number | undefined;
    name: string | undefined;
    groupIds: number[];
  }
) => {
  // TODO: Group IDs Update
  return await database.artist.update({
    where: { id },
    data: {
      imageId: data.imageId,
      name: data.name,
    },
  });
};
export const getArtistRecord = async (id: number) => {
  return await database.artist.findUnique({
    where: {
      id,
    },

    select: {
      name: true,
      id: true,
      company: {
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
      groups: {
        select: {
          group: {
            select: {
              id: true,
              name: true,
            },
          },
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

export const getArtistsRecordForCompany = async (companyId: number) => {
  return await database.artist.findMany({
    where: {
      companyId,
    },
  });
};
