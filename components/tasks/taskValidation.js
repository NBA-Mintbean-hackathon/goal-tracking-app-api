const Joi = require("joi");

const taskSchema = Joi.object({
  token: Joi.string().required(),
  title: Joi.string().min(3).max(256).required(),
  body: Joi.string().min(3).max(500),
  category: Joi.string()
    .valid("career", "health", "personal", "social")
    .required(),
});

const Validate = (schema) => (data) => schema.validate(data);

module.exports = {
  taskValidation: Validate(taskSchema),
};
