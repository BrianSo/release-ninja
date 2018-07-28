const compose = require('connect-compose');
const asyncHandler = require("../utils/asyncHandler");

module.exports = {
  dev: asyncHandler(async (req, res) => {
    res.json({ result: 'success' });
  }),

  devUser: asyncHandler(async (req, res) => {
    res.json(req.user.toJSON());
  }),
};
