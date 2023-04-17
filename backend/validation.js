const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-z0-9A-Z]{6,20}$"))
      .required(),
    role: Joi.string().required().valid(process.env.ADMIN_PASSWORD, "customer"),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-z0-9A-Z]{6,20}$"))
      .required(),
  });
  return schema.validate(data);
};

const infoValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().optional().allow(""),
  });
  return schema.validate(data);
};

const rateValidation = (data) => {
  const schema = Joi.object({
    rate: Joi.number().required(),
  });
  return schema.validate(data);
};

const commentValidation = (data) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
    display: Joi.boolean().required(),
    reply: Joi.string().optional().allow(""),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.infoValidation = infoValidation;
module.exports.rateValidation = rateValidation;
module.exports.commentValidation = commentValidation;
