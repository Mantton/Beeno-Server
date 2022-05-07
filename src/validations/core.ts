import Joi from "joi";
import { validateRequest } from "./base";

// GROUP
export const validateGroupRequest = () => {
  const schema = Joi.object({
    name: Joi.string().required().max(40),
    companyId: Joi.number().required(),
    bannerImageId: Joi.number(),
    logoImageId: Joi.number().required(),
  });

  return validateRequest(schema);
};

// ARTIST
export const validateArtistRequest = () => {
  const schema = Joi.object({
    name: Joi.string().required().max(40),
    companyId: Joi.number().required(),
    imageId: Joi.number().required(),
    groupIds: Joi.array(),
  });

  return validateRequest(schema);
};

// ERA - Group

export const validateEraForGroupRequest = () => {
  const schema = Joi.object({
    title: Joi.string().required().max(40),
    groupId: Joi.number().required(),
    imageId: Joi.number().required(),
    startDate: Joi.date().allow(null),
  });

  return validateRequest(schema);
};

// COLLECTION

export const validateCollectionRequest = () => {
  const schema = Joi.object({
    eraId: Joi.number().required(),
    title: Joi.string().required().max(40),
  });
  return validateRequest(schema);
};

// CARD SET

export const validateCardCreationRequest = () => {
  const schema = Joi.object({
    eraId: Joi.number().integer().required(),
    setId: Joi.number().integer(),
    imageId: Joi.number().integer().required(),
    artistIds: Joi.array().items(Joi.number().integer().required()).required(),
  });

  return validateRequest(schema);
};
