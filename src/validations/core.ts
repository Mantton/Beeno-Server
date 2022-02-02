import Joi from "joi";
import { validateRequest } from "./base";

// GROUP
export const validateGroupRequest = () => {
  const schema = Joi.object({
    name: Joi.string().required().max(40),
    companyId: Joi.number().required(),
    imageId: Joi.number().required(),
  });

  return validateRequest(schema);
};

// ARTIST
export const validateArtistRequest = () => {
  const schema = Joi.object({
    name: Joi.string().required().max(40),
    companyId: Joi.number().required(),
    imageId: Joi.number().required(),
    groupId: Joi.number().allow(null),
  });

  return validateRequest(schema);
};
