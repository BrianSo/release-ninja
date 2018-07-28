const passport = require("passport");
const passportLocal = require("passport-local");
const _ = require("lodash");

const User = require("../models/User");
const UnauthorizedError = require("../utils/errors").UnauthorizedError;
const LoginFailedError = require("../utils/errors").LoginFailedError;
const UserNotFoundError = require("../utils/errors").UserNotFoundError;

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (id, done) => {
  try{
    done(undefined, await User.findById(id));
  } catch (e) {
    done(e);
  }
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  try{
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return done(new LoginFailedError());
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return done(undefined, user);
    }
    return done(new LoginFailedError());

  } catch (e) {
    done(e);
  }
}));

/**
 * Login Required middleware.
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  if (req.isAPICall) {
    next(new UnauthorizedError())
  } else {
    req.session.returnTo = req.originalUrl;
    res.redirect("/cms/login");
  }
};

/**
 * Authorization Required middleware.
 */
const isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

module.exports = {
  isAuthenticated,
  isAuthorized
};
