import { Rarity } from "@prisma/client";
import { database } from "../helpers";
import { logger } from "../utils";

export async function seedRarities() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rarities: Rarity[] = require("../../data/rarity.json");

  database.$transaction(async (database) => {
    const promises = rarities.map((rarity) => {
      return database.rarity.upsert({
        where: {
          id: rarity.id,
        },
        update: rarity,
        create: rarity,
      });
    });

    await Promise.all(promises);
    logger.info("Rarities Updated");
  });
}
