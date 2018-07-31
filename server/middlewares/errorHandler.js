const errorHandler = require("errorhandler");
const BaseError = require("../utils/errors").BaseError;
const devErrorHandler = errorHandler();

module.exports = (err, req, res, next) => {
  if (!err) {
    res.status(500);
    res.send("Internal Server Error");
    return;
  }
  res.status(err.status || 500);
  if (req.isAPICall) {
    const error = {
      code: err.code,
      message: err.message,
      status: err.status,
      extras: err.extras,
    };

    if (process.env.NODE_ENV !== "production") {
      error.stack = err.stack;
    }

    if (err instanceof BaseError) {
      // Create full path for joi errors
      if (error.extras.isJoi) {
        // eslint-disable-next-line no-param-reassign
        error.extras.errorPath = error.extras.details[0].path.join('');
      }

      const errorToSend = {
        errorCode: error.code,
        message: req.t(`errors:${error.code}`, error.extras),
        extra: error.extra,
        stack: error.stack,
      };

      if (process.env.TEST) {
        console.info(req.method, req.url, JSON.stringify(errorToSend, null, '\t'));
      }

      res.json(errorToSend);
    } else {
      console.error(req.method, req.url, err);
      res.status(500);
      res.end();
    }


  } else {
    if (process.env.NODE_ENV === "production") {
      res.send("Internal Server Error: " + err.message);
    } else {
      devErrorHandler(err, req, res, next);
    }
  }
};
