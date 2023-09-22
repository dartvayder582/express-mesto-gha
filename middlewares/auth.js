const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  // return jwt.verify(token, 'super-strong-secret')
  //   .then((result) => {
  //     console.log(result);
  //     next();
  //   });
  try {
    // console.log(token);
    payload = jwt.verify(token, 'this is a temporary key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;
  // console.log(req.user);

  next();
};
