const Joi = require("joi");

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().max(256).required(),
  password: Joi.string().max(256).required(),
});

const Validate = (schema) => (data) => schema.validate(data);

module.exports = {
  registrationValidation: Validate(registrationSchema),
  loginValidation: Validate(loginSchema),
};
