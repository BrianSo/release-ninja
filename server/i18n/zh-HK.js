module.exports = {
  translation: {

  },
  errors: {
    // 400
    BadRequestError: 'Bad Request',
    JoiValidationError: '無效的請求, 位置: {{errorPath}}',

    // 401
    UnauthorizedError: 'Unauthorized',
    LoginFailedError: '登入失敗',

    // 403
    ForbiddenError: 'Forbidden',

    // 404
    NotFoundError: 'Resource Not Found',
    UserNotFoundError: '找不到用戶',

    // 409
    ConflictError: 'ConflictError',

    // 500
    InternalServerError: 'Internal Server Error',
    NotImplementedError: '此功能即將上線',
  },
};
