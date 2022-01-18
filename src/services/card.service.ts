import { database } from "../helpers/prisma";

export const generateAndInsertCards = async (
  setId: number,
  iterations: number
) => {
  const cardsData = [];

  for (let iteration = iterations; iteration > 0; iteration--) {
    const card = {
      setId,
      iteration,
    };

    cardsData.push(card);
  }
  const result = await database.card.createMany({
    data: cardsData,
    skipDuplicates: true,
  });

  return result.count;
};
