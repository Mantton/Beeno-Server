import { Request, Response } from "express";
export const getArtists = (req: Request, res: Response) => {
  res.send({ msg: "artist" });
};
