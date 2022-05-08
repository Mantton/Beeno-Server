import { DEFAULT_IMAGE } from "../config/constants";
import { database } from "../helpers";
import { IEra } from "../types/serialized/era";

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

export const fetchEraRecord = async (eraId: number): Promise<IEra | null> => {
  const era = await database.era.findUnique({
    where: {
      id: eraId,
    },
    include: {
      image: {
        select: {
          base: true,
        },
      },
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
      group: {
        select: {
          id: true,
          name: true,
          logoImage: {
            select: {
              base: true,
            },
          },
          bannerImage: {
            select: {
              base: true,
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
      },
      sets: {
        select: {
          id: true,
          title: true,
        },
      },
      cards: {
        select: {
          id: true,
          setId: true,
          rarity: true,
          image: {
            select: {
              base: true,
            },
          },
          artists: {
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
      },
    },
  });

  if (!era) {
    return null;
  }

  type ownershipBD = {
    cardId: number;
    ownedCount: number;
    unownedCount: number;
  };
  const ownershipList: ownershipBD[] = await database.$queryRaw`
  SELECT cards.id                                 as "cardId",
       COALESCE("ownedAgg"."ownedCount", 0)     as "ownedCount",
       COALESCE("unOnwedAgg"."unOwnedCount", 0) as "unownedCount"
FROM "cards"
         LEFT JOIN (SELECT "cards_items"."cardId", COUNT(*) AS "ownedCount"
                    FROM "cards_items"
                    where cards_items."ownerId" is not null
                    GROUP BY "cards_items"."cardId") AS "ownedAgg"
                   ON ("cards"."id" = "ownedAgg"."cardId")
         LEFT JOIN (SELECT "cards_items"."cardId", COUNT(*) AS "unOwnedCount"
                    FROM "cards_items"
                    where cards_items."ownerId" is null
                    GROUP BY "cards_items"."cardId") AS "unOnwedAgg"
                   ON ("cards"."id" = "unOnwedAgg"."cardId")
WHERE "cards"."eraId" = ${era.id}`;

  return {
    title: era.title,
    id: era.id,
    imageUrl: era.image?.base ?? DEFAULT_IMAGE,
    group: era.group
      ? {
          id: era.group.id,
          name: era.group.name,
          bannerImageUrl: era.group.bannerImage?.base ?? null,
          logoImageUrl: era.group.logoImage?.base ?? DEFAULT_IMAGE,
          members: era.group.members.map((v) => ({
            id: v.artist.id,
            name: v.artist.name,
            imageUrl: v.artist.image?.base ?? DEFAULT_IMAGE,
          })),
        }
      : null,
    artist: era.artist
      ? {
          id: era.artist.id,
          name: era.artist.name,
          imageUrl: era.artist.image?.base ?? DEFAULT_IMAGE,
        }
      : null,
    startDate: era.startDate,
    sets: era.sets,
    cards: era.cards.map((data) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ownership = ownershipList.find((v) => v.cardId == data.id)!;
      return {
        id: data.id,
        imageUrl: data.image.base,
        rarity: data.rarity,
        artists: data.artists.map((v) => ({
          id: v.artist.id,
          name: v.artist.name,
          imageUrl: v.artist.image?.base ?? DEFAULT_IMAGE,
        })),
        favorites: 0,
        items: {
          total: ownership.ownedCount + ownership.unownedCount,
          inTreasury: ownership.unownedCount,
          onTradeHub: 0,
          owned: ownership.ownedCount,
        },
      };
    }),
  };
};
