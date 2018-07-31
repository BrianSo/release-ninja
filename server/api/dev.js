const compose = require('connect-compose');
const Joi = require('joi');
const asyncHandler = require("../utils/asyncHandler");
const joiValidation = require("../middlewares/joiValidation");
const NotImplementedError = require("../utils/errors").NotImplementedError;
module.exports = {
  dev: asyncHandler(async (req, res) => {
    res.json({ result: 'success', test: process.env.TEST });
  }),

  devUser: asyncHandler(async (req, res) => {
    res.json(req.user.toJSON());
  }),

  devError: compose([
    joiValidation.body({
      test: Joi.string().required(),
    }),
    asyncHandler(async (req, res) => {
      throw new NotImplementedError();
    })
  ]),
};
