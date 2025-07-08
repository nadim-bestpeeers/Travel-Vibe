import Joi from "joi";
export  const registerSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Enter a valid email address",
      }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
  });