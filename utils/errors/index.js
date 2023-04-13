const NotFoundError = require('./NotFoundError'); // 404
const AuthError = require('./AuthError'); // 401
const BadRequestError = require('./BadRequestError'); // 400
const ForbiddenError = require('./ForbiddenError'); // 403
const ConflictError = require('./ConflictError'); // 409

module.exports = {
  NotFoundError,
  AuthError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
};
