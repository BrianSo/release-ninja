class BaseError extends Error{
  constructor(code, status, extras) {
    super(code || 'BaseError');
    this.code = code || 'BaseError';
    this.extras = extras || {};
    this.status = status || 500;
  }
}

class BadRequestError extends BaseError {
  constructor(extras) {
    super('BadRequestError', 400, extras);
    Error.captureStackTrace(this, BadRequestError);
  }
}

class UnauthorizedError extends BaseError {
  constructor(extras) {
    super('UnauthorizedError', 401, extras);
    this.code = 'UnauthorizedError';
    Error.captureStackTrace(this, UnauthorizedError);
  }
}

class ForbiddenError extends BaseError {
  constructor(extras) {
    super('ForbiddenError', 403, extras);
    Error.captureStackTrace(this, ForbiddenError);
  }
}

class NotFoundError extends BaseError {
  constructor(extras) {
    super('NotFoundError', 404, extras);
    Error.captureStackTrace(this, NotFoundError);
  }
}

class ConflictError extends BaseError {
  constructor(extras) {
    super('ConflictError', 409, extras);
    Error.captureStackTrace(this, ConflictError);
  }
}

class InternalServerError extends BaseError {
  constructor(extras) {
    super('InternalServerError', 500, extras);
    Error.captureStackTrace(this, ConflictError);
  }
}

module.exports = {
  BaseError,

  BadRequestError,
  JoiValidationError: class JoiValidationError extends BadRequestError{
    constructor(joiError) {
      super({ errorPath: joiError.details[0].path.join('.'), details: joiError.details });
      this.code = 'JoiValidationError';
    }
  },

  UnauthorizedError,
  LoginFailedError: class LoginFailedError extends UnauthorizedError {
    constructor(...args) {
      super(...args);
      this.code = 'LoginFailedError';
    }
  },

  ForbiddenError,

  NotFoundError,
  UserNotFoundError: class UserNotFoundError extends NotFoundError {
    constructor(...args) {
      super(...args);
      this.code = 'UserNotFoundError';
    }
  },

  ConflictError,

  InternalServerError,
  NotImplementedError: class NotImplementedError extends InternalServerError {
    constructor(...args) {
      super(...args);
      this.code = 'NotImplementedError';
    }
  },
};
