import { database } from "../helpers";

export async function insertCollectionRecord(title: string, eraId: number) {
  return await database.collection.create({
    data: {
      title,
      eraId,
    },
  });
}

export async function fetchCollectionRecord(id: number) {
  return await database.collection.findUnique({
    where: {
      id,
    },
  });
}
export async function deleteCollectionRecord(id: number) {
  return await database.collection.delete({
    where: {
      id,
    },
  });
}
