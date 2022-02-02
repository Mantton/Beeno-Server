import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const OPTIONS = {
      abortEarly: true,
      allowUnknown: false,
    };

    const value = schema.validate(req.body, OPTIONS);
    if (value.error) {
      res.status(400).send({ msg: "bad request" });
      return;
    }
    next();
  };
};
