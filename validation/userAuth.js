import joi from "joi";

export const userAuthentication = joi.object({
  email: joi.string().min(5).max(50).email().required(),
  password: joi.string().min(5).max(1024).required(),
});
