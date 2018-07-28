const { Router } = require('express');
const devHandlers = require('./api/dev');
const csrf = require('./utils/csrf');

const app = Router();
const apiRouter = Router();
app.use(
  '/api',
  (req, res, next) => { req.isAPICall = true; next(); },
  apiRouter
);
apiRouter.post('/dev', csrf, devHandlers.dev);

module.exports = app;
