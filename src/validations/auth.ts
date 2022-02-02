import Joi from "joi";
import { validateRequest } from "./base";

export const validateAccountExistsFlow = () => {
  const schema = Joi.object({
    text: Joi.string().required().max(35),
  });
  return validateRequest(schema);
};

export const validateHandleFlow = () => {
  const schema = Joi.object({
    handle: Joi.string().required().max(35),
  });
  return validateRequest(schema);
};

export const validateLoginRequest = () => {
  // Define Joi Schema
  const schema = Joi.object({
    email: Joi.string().email(),
    handle: Joi.string().max(15),
    password: Joi.string().required().max(40),
  }).xor("email", "handle");

  return validateRequest(schema);
};
