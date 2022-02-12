import { Rarity } from "@prisma/client";
import { database } from "../helpers";
import { logger } from "../utils";
/**
 * Creates A new Rarity
 * @param label The Name of the Rarity
 * @param points The Beeno Points given when card of said rarity is owned
 * @param iterations The number of iterations this card has.
 */
export async function insertRarityRecord(label: string, points: number) {
  return await database.rarity.create({
    data: { label, points },
  });
}

export async function getRarityRecord(id: number) {
  return await database.rarity.findFirst({ where: { id } });
}

/**
 * Generates Default List of Rarities
 */
export async function seedRarities() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rarities = require("../../data/rarities.json");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promises = rarities.map((rarity: any) => {
    return database.rarity.upsert({
      where: {
        label: rarity.label,
      },
      update: rarity,
      create: rarity,
    });
  });

  await Promise.all(promises);
  logger.info("Updated Rarities");
}

/**
 * fetches a rarity record
 * @param id id of rarity
 * @returns the rarity record or null
 */
export async function fetchRarityRecord(id: number) {
  return await database.rarity.findUnique({
    where: {
      id,
    },
  });
}

export async function getRandomRarity() {
  // Reference : https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access
  const out = await database.$queryRaw<
    Rarity[]
  >`SELECT * FROM rarity ORDER BY random() LIMIT 1;`;
  return out[0];
}
