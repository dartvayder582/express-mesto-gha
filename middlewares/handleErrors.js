// eslint-disable-next-line no-unused-vars
module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    const VALID_ERROR = 400;
    return res.status(VALID_ERROR).send({ message: 'Введены некорректные данные' });
  }
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
