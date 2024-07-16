const Joi = require("joi");

const { nameRegexp, emailRegexp, passwordRegexp } = require("../values/patterns");
const subscriptionList = require("../values/subscriptionList");

const userRegisterSchema = Joi.object({

    name: Joi.string().pattern(nameRegexp).required().messages({
        "any.required": `missing required name field`,
        "string.empty": `Name can include numbers and letters (Latin, Cyrillic), the minimum number of characters in the field is 1 (inclusive), the maximum is 16 (inclusive)`,
    }),

    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing required email field`,
        "string.empty": `Email can contain capital and small Latin letters (A-Z, a-z), numbers (from 0 to 9) and special symbols !#$%^&*_-=*/?+ but no more than 64 characters`,
    }),

    password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .min(6)
    .max(16)
    .messages({
      "any.required": `missing required password field`,
      "string.empty": `Password must include numbers and letters - the minimum number of characters in the field - 6 (inclusive), the maximum - 16 (inclusive)`,
    }),
  
  
    // email: Joi.string()
    //     .pattern(emailRegexp)
    //     .required().email().messages({
    //     "any.required": `missing required email field`,
    //     "string.empty": `email cannot be an empty field`,
    // }),
    // password: Joi.string().required().length(6-10).messages({
    //     "any.required": `missing required password field`,
    //     "string.empty": `password cannot be an empty field`,
    // }),
});


const userLoginSchema = Joi.object({

    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing required email field`,
        "string.empty": `Email can contain capital and small Latin letters (A-Z, a-z), numbers (from 0 to 9) and special symbols !#$%^&*_-=*/?+ but no more than 64 characters`,
    }),
    
    password: Joi.string()
        .pattern(passwordRegexp)
        .required()
        .min(6)
        .max(16)
        .messages({
            "any.required": `missing required password field`,
            "string.empty": `Password must include numbers and letters - the minimum number of characters in the field - 6 (inclusive), the maximum - 16 (inclusive)`,
        }),
  
})

const userUpdateSubscription = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionList)
        .required(),
});

const verifySchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be an empty field`,
    }),
});

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userUpdateSubscription,
    verifySchema,
};