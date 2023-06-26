const Joi = require("joi");

const { phoneRegexp } = require("../values/patterns");

const contactsAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
        "string.empty": `name cannot be an empty field`,
    }),
    email: Joi.string().email().required().messages({
        "any.required": `missing required email field`,
        "string.empty": `email cannot be an empty field`,
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "any.required": `missing required phone field`,
        "string.empty": `phone cannot be an empty field`,
    }),
});

const contactsUpdate = Joi.object({
    name: Joi.string().messages({
        "string.empty": `name cannot be an empty field`,
    }),
    email: Joi.string().email().messages({
        "string.empty": `email cannot be an empty field`,
    }),
    phone: Joi.string().pattern(phoneRegexp).messages({
        "string.empty": `phone cannot be an empty field`,
    }),
});
const contactsUpdateFavotite = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = {
    contactsAddSchema,
    contactsUpdate,
    contactsUpdateFavotite,
};