import { deleteCardSetRecord } from "../database";
import { database } from "../helpers";

export async function deleteCardSet(id: number) {
  const set = await database.cardSet.findUnique({
    where: {
      id,
    },
  });

  if (!set) return null;

  if (set.published) return null;

  return deleteCardSetRecord(id);
}
