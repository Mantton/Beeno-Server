import { database } from "../helpers";

/**
 * Saves an Image address to the database
 * @param url The URL of the image
 */
export const insertImageRecord = async (url: string, uploaderId: number) => {
  return await database.image.create({
    data: {
      base: url,
      uploaderId: uploaderId,
    },
  });
};
