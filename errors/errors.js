const notFoundError = (res, msg) => {
  const ERROR_CODE = 404;
  return res.status(ERROR_CODE).send({ message: msg });
};

const serverError = (res) => {
  const ERROR_CODE = 500;
  return res.status(ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
};

const badRequestError = (res, msg) => {
  const ERROR_CODE = 400;
  return res.status(ERROR_CODE).send({ message: msg });
};

module.exports = {
  notFoundError,
  serverError,
  badRequestError,
};
