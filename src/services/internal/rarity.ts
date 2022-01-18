import { database } from "../../helpers";
import logger from "../../utils/logger";
/**
 * Creates A new Rarity
 * @param label The Name of the Rarity
 * @param points The Beeno Points given when card of said rarity is owned
 * @param iterations The number of iterations this card has.
 */
export async function insertRarityRecord(
  label: string,
  points: number,
  hex: string
) {
  return await database.rarity.create({ data: { label, points, hex } });
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
