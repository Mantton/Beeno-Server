import { database } from "../helpers/prisma";

/**
 * Saves an Image address to the database
 * @param url The URL of the image
 */
export const insertImageRecord = async (url: string) => {
  return await database.image.create({
    data: {
      base: url,
    },
  });
};
