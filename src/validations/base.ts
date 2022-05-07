import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateRequest = (
  schema: Joi.ObjectSchema,
  allowUnknown = false
) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const OPTIONS = {
      abortEarly: true,
      allowUnknown,
    };

    const value = schema.validate(req.body, OPTIONS);
    if (value.error) {
      res.status(400).send({
        msg: "bad request",
        failing_validations: value.error.details[0].message,
      });
      return;
    }
    next();
  };
};
