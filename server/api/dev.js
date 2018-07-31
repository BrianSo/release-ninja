const compose = require('connect-compose');
const asyncHandler = require("../utils/asyncHandler");
const NotImplementedError = require("../utils/errors").NotImplementedError;

module.exports = {
  dev: asyncHandler(async (req, res) => {
    res.json({ result: 'success' });
  }),

  devUser: asyncHandler(async (req, res) => {
    res.json(req.user.toJSON());
  }),

  devError: asyncHandler(async (req, res) => {
    throw new NotImplementedError();
  })
};
