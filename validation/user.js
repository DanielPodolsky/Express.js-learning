import joi from "joi";

export const userValidation = joi.object({
  firstName: joi.string().min(2).max(50).required(),
  lastName: joi.string().min(2).max(50).required(),
  email: joi.string().min(5).max(50).email().required(),
});

export const updateUserValidations = joi.object({
  firstName: joi.string().min(2).max(50).optional(),
  lastName: joi.string().min(2).max(50).optional(),
  email: joi.string().min(5).max(50).email().optional(),
});
