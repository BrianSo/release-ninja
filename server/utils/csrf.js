const csurf = require('csurf');

if (process.env.TEST) {
  module.exports = (req, res, next) => {
    req.csrfToken = () => '1234';
    next();
  };
} else {
  module.exports = csurf();
}
