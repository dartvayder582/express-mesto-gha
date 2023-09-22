const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../errors');

// const { JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'this is a temporary key');
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
