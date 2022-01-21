import { database } from "../helpers";

export const fetchCardSetRecord = async (
  id: number,
  includeArtists = false
) => {
  return await database.cardSet.findUnique({
    where: {
      id,
    },
    include: {
      artists: includeArtists,
    },
  });
};
export const insertCardSetRecord = async (
  title: string,
  collectionId: number,
  rarityId: number,
  imageId: number,
  artistIds: number[]
) => {
  if (artistIds.length == 0) throw "ERR_NO_ARTISTS_PROVIDED"; // should never happen as data is validated before here

  // DB Transaction
  const set = await database.$transaction(async (repo) => {
    // Create Set
    const set = await repo.cardSet.create({
      data: {
        title,
        collectionId,
        rarityId,
        imageId,
      },
    });

    // Query, See : https://www.prisma.io/docs/concepts/components/prisma-client/crud#create-multiple-records
    const dataMap = artistIds.map((id) => ({ artistId: id, setId: set.id }));

    // Create Artist Records
    await repo.cardSetArtist.createMany({
      data: dataMap,
    });

    return set;
  });

  return set;
};

export const fetchCardSetArtists = async (id: number) => {
  const artists = await database.cardSetArtist.findMany({
    where: {
      setId: id,
    },
    include: {
      artist: true,
    },
  });

  // return array of artists
  return artists.map((data) => data.artist);
};

export async function fetchCardCountForSet(id: number) {
  return await database.card.count({
    where: {
      setId: id,
    },
  });
}
