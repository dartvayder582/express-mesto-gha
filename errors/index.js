const NotAuthError = require('./notAuthError');
const NotFoundError = require('./notFoundError');
const BadRequestError = require('./badRequestError');
const UserExistError = require('./userExistError');
const ForbiddenError = require('./forbiddenError');

module.exports = {
  NotAuthError,
  NotFoundError,
  BadRequestError,
  UserExistError,
  ForbiddenError,
};
