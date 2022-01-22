import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
};
export const validateExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    text: Joi.string().required().max(35),
  });
  const value = schema.validate(req.body, OPTIONS);
  if (value.error) {
    res.status(422).send({ msg: "bad request" });
    return;
  }

  next();
};

export const validateHandleFlow = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    handle: Joi.string().required().max(35),
  });
  const value = schema.validate(req.body, OPTIONS);
  if (value.error) {
    res.status(422).send({ msg: "bad request" });
    return;
  }

  next();
};

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

  const value = schema.validate(req.body, OPTIONS);

  if (value.error) {
    res.status(422).send({ msg: "bad request" });
    return;
  }

  next();
};
