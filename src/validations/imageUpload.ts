import { fromBuffer } from "file-type";

export const isValidImage = async (file: Express.Multer.File) => {
  // reference : https://stackoverflow.com/a/68283248
  const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (!whitelist.includes(file.mimetype)) return false;
  const meta = await fromBuffer(file.buffer);
  if (!meta) return false;
  if (!whitelist.includes(meta.mime)) return false;

  return true;
};
