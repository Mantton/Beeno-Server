import { Request, Response, NextFunction } from "express";
import { createImage } from "../services";
import { isValidImage } from "../validations/imageUpload";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.account) {
    res.status(401).send({ msg: "unauthorized" });
    return;
  }
  try {
    const file = req.file;

    // If no file is sent or the received file is of the wrong type
    if (!file || !(await isValidImage(file))) {
      res.status(400).send({ msg: "bad request", success: false });
      return;
    }
    const data = await createImage(file, req.session.account.id);

    res.send({ data, success: true });
  } catch (err) {
    next(err);
  }
};
