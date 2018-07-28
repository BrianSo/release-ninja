const { Router } = require('express');
const devHandlers = require('./api/dev');
const userHandlers = require('./api/user');
const csrf = require('./utils/csrf');
const passportAuth = require('./middlewares/passportAuthentication');

const app = Router();
const apiRouter = Router();
app.use(
  '/api',
  (req, res, next) => { req.isAPICall = true; next(); },
  apiRouter
);
apiRouter.post('/dev', csrf, devHandlers.dev);
apiRouter.post('/login', csrf, userHandlers.login);
apiRouter.post('/logout', csrf, userHandlers.logout);
apiRouter.get("/user", passportAuth.isAuthenticated, devHandlers.devUser);

module.exports = app;
