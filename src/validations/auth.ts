import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Define Joi Schema
  const schema = Joi.object({
    email: Joi.string().email(),
    handle: Joi.string().max(15),
    password: Joi.string().required().max(40),
  }).xor("email", "handle");

  const value = schema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (value.error) {
    res.status(422).send({ msg: "bad request" });
    return;
  }

  next();
};
