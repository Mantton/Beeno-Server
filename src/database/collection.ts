import { database } from "../helpers";

export async function insertCollectionRecord(title: string, eraId: number) {
  return await database.collection.create({
    data: {
      title,
      eraId,
    },
  });
}
