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
    const errorToSend = {
      code: err.code,
      message: req.t(`errors:${err.code}`, err.extras),
      status: err.status,
      extras: err.extras,
    };

    if (process.env.NODE_ENV !== "production") {
      errorToSend.stack = err.stack;
      errorToSend.originalMessage = err.message;
    }

    if (!(err instanceof BaseError) || process.env.TEST) {
      console.info(req.method, req.url, JSON.stringify(errorToSend, null, '\t'));
    }

    res.json(errorToSend);
  } else {
    if (process.env.NODE_ENV === "production") {
      res.send("Internal Server Error: " + err.message);
    } else {
      devErrorHandler(err, req, res, next);
    }
  }
};
