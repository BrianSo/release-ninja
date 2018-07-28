const compose = require('connect-compose');
const asyncHandler = require("../utils/asyncHandler");
const passport = require('passport');

module.exports = {
  login: asyncHandler(async (req, res, next) => {
    // req.assert("email", "Email is not valid").isEmail();
    // req.assert("password", "Password cannot be blank").notEmpty();
    // req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    // const errors = req.validationErrors();
    //
    // if (errors) {
    //   req.flash("errors", errors);
    //   return res.redirect("/login");
    // }

    passport.authenticate("local", (err, user, info) => {
      if (err) { return next(err); }

      if (!user) {
        return next({
          errors: info.message,
        });
      }

      req.logIn(user, (err) => {
        if (err) { return next(err); }
        res.json({});
      });

    })(req, res, next);
  }),

  logout: asyncHandler(async (req, res) => {
    req.logout();
    res.json({});
  }),
};
