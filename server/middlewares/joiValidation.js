const Joi = require('joi');
const JoiValidationError = require("../utils/errors").JoiValidationError;

const joiValidation = (schema) => async (req, res, next) => {
  try {
    // eslint-disable-next-line
    for (const key of Object.keys(schema)) {
      req[key] = await Joi.validate(req[key], schema[key]);
    }
    next();
  } catch (e) {
    next(new JoiValidationError(e));
  }
};
joiValidation.body = (schema) => joiValidation({ body: schema });
joiValidation.query = (schema) => joiValidation({ query: Joi.object(schema).unknown() });
joiValidation.params = (schema) => joiValidation({ params: Joi.object(schema).unknown() });
joiValidation.cookies = (schema) => joiValidation({ cookies: Joi.object(schema).unknown() });
joiValidation.session = (schema) => joiValidation({ session: Joi.object(schema).unknown() });

module.exports = joiValidation;
