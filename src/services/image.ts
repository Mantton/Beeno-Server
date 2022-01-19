import { database } from "../helpers";
import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { BUCKET_NAME } from "../utils";
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

/**
 * Uploads Image to GCS Bucket
 * @param file { Express.Multer.File }
 * @returns { string } Promise of Uploaded Image URL
 */
export const uploadImage = (file: Express.Multer.File) =>
  new Promise<string>((resolve, reject) => {
    const { buffer } = file;

    const storage = admin.storage();
    const bucket = storage.bucket(BUCKET_NAME);

    // * file type is validated to be an image atp
    const fileName = `${uuidv4()}.png`;

    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", (err) => {
        reject(err);
      })
      .end(buffer);
  });

export const createImage = async (
  file: Express.Multer.File,
  uploader: number
) => {
  const imageUrl = await uploadImage(file);
  const record = await insertImageRecord(imageUrl, uploader);
  return record;
  //TODO :probably want to log this
};
