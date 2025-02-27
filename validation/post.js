import joi from "joi";

export const postValidation = joi.object({
  title: joi.string().min(5).max(50).required(),
  body: joi.string().min(10).max(500).required(),
});

export const updatePostValidation = joi.object({
  title: joi.string().min(5).max(50).optional(),
  body: joi.string().min(10).max(500).optional(),
});

export const postTitleValidation = joi.object({
  title: joi.string().min(5).max(50).required(),
});
