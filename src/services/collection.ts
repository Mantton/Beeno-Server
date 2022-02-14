import { database } from "../helpers";

export async function deleteCollection(id: number) {
  database.$transaction(async (database) => {
    // Get Card Sets
    // Delete Card Set Artists
  });
}
