import { cleanRarities } from "../config/constants";
import { getEraRecord } from "../database";
import { sortRarity } from "../utils";
import { imageUrl } from "../utils/image";

export const getEra = async (id: number) => {
  const result = await getEraRecord(id);

  if (!result || !result.group || !result.collections) return null;

  const group = result.group;
  const members = group.members.map((entry) => ({
    id: entry.artist.id,
    name: entry.artist.name,
    imageUrl: imageUrl(entry.artist.image),
  }));

  const collections = result.collections.map((entry) => ({
    id: entry.id,
    title: entry.title,
    sets: entry.sets
      .map((set) => ({
        id: set.id,
        created: set.created,
        rarity: set.rarity,
        imageUrl: imageUrl(set.image),
        artists: set.artists.map((entry) => ({
          id: entry.artist.id,
          imageUrl: imageUrl(entry.artist.image),
          name: entry.artist.name,
        })),
      }))
      .sort((a, b) => {
        return sortRarity(a.rarity.id, b.rarity.id);
      }),
  }));

  // Rarity Breakdown Logic
  type res = { [key: string]: number };
  const byRarity: res = {};
  const byMember: { [key: string]: res } = {};
  const allSets = collections.flatMap((x) => x.sets);

  for (const rarity of cleanRarities) {
    const count = allSets.filter((s) => s.rarity.id === rarity).length;
    byRarity[rarity] = count;
  }

  for (const member of members) {
    const result: res = {};

    for (const rarity of cleanRarities) {
      const count = allSets.filter(
        (s) =>
          s.rarity.id === rarity &&
          s.artists.map((v) => v.id).includes(member.id)
      ).length;
      result[rarity] = count;
    }

    byMember[member.id] = result;
  }

  return {
    id: result.id,
    title: result.title,
    imageUrl: imageUrl(result.image),
    group: {
      id: group.id,
      name: group.name,
      bannerImageUrl: imageUrl(group.bannerImage),
      logoImageUrl: imageUrl(group.logoImage),
      members,
    },

    collections,
    rarityBreakdown: {
      all: byRarity,
      byMember,
    },
  };
};
