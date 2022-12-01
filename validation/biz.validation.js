const Joi = require("joi");
const validate = require("./validate");

const newBizSchema = Joi.object({
  bizName: Joi.string().min(2).max(255).required().trim(),
  bizDescription: Joi.string().allow("").min(2).trim(),
  bizAddress: Joi.string().min(5).max(255).required().trim(),
  bizPhone: Joi.string()
    .min(2)
    .max(20)
    .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/)
    .required(),
  bizImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
});
const updateBizSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
  bizName: Joi.string().allow("").min(2).max(255).trim(),
  bizDescription: Joi.string().allow("").trim(),
  bizAddress: Joi.string().allow("").min(5).max(255).trim(),
  bizPhone: Joi.string()
    .allow("")
    .min(2)
    .max(20)
    .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/),
  bizImg: Joi.string()
    .allow("")
    .regex(/^http(s?)\:\/\/(\.?)/),
});
const deleteBizSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});
const findBizcardByIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const validateNewBizSchema = (userInput) => {
  return validate(newBizSchema, userInput);
};
const validateUpBizSchema = (userInput) => {
  return validate(updateBizSchema, userInput);
};
const validateDeleteBizSchema = (userInput) => {
  return validate(deleteBizSchema, userInput);
};
const validateFindBizcardByIdSchema = (userInput) => {
  return validate(findBizcardByIdSchema, userInput);
};

module.exports = {
  newBizSchema,
  validateNewBizSchema,
  validateUpBizSchema,
  validateDeleteBizSchema,
  validateFindBizcardByIdSchema,
};
