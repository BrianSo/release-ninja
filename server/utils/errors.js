class BadRequestError extends Error {
  constructor(extras) {
    super('BadRequestError');
    this.code = 'BadRequestError';
    this.extras = extras;
    this.status = 400;
    Error.captureStackTrace(this, BadRequestError);
  }
}

class UnauthorizedError extends Error {
  constructor(extras) {
    super('UnauthorizedError');
    this.code = 'UnauthorizedError';
    this.extras = extras;
    this.status = 401;
    Error.captureStackTrace(this, UnauthorizedError);
  }
}

class LoginFailedError extends UnauthorizedError {
  constructor(...args) {
    super(...args);
    this.code = 'LoginFailedError';
  }
}

class ForbiddenError extends Error {
  constructor(extras) {
    super('ForbiddenError');
    this.code = 'ForbiddenError';
    this.extras = extras;
    this.status = 400;
    Error.captureStackTrace(this, ForbiddenError);
  }
}

class NotFoundError extends Error {
  constructor(extras) {
    super('NotFoundError');
    this.code = 'NotFoundError';
    this.extras = extras;
    this.status = 404;
    Error.captureStackTrace(this, NotFoundError);
  }
}

class UserNotFoundError extends NotFoundError {
  constructor(...args) {
    super(...args);
    this.code = 'UserNotFoundError';
  }
}

class ConflictError extends Error {
  constructor(extras) {
    super('ConflictError');
    this.code = 'ConflictError';
    this.extras = extras;
    this.status = 409;
    Error.captureStackTrace(this, ConflictError);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UserNotFoundError,
  LoginFailedError
};
