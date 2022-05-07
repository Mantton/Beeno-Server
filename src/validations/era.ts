import { RequestHandler } from "express";
import Joi from "joi";
import { validateRequest } from "./base";

export const handleValidateEraSearchRequest = () => {
  // validate query id
  const schema = Joi.object({
    id: Joi.number().required(),
    members: Joi.array().items(Joi.number()),
    rarities: Joi.array().items(Joi.number()),
    sort: Joi.string().required(),
    order: Joi.string().required(),
  });
  return validateRequest(schema, false);
};
