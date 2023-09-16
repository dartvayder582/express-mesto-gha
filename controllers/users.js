const Users = require('../models/user');
const { notFoundError, badRequestError, serverError } = require('../errors/errors');

const getUsers = (req, res) => Users.find({})
  .then((users) => res.send(users))
  .catch(() => serverError(res));

const getUserById = (req, res) => {
  const { userId } = req.params;

  return Users.findById(userId)
    .then((user) => {
      if (!user) {
        return notFoundError(res, 'Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return badRequestError(res, 'Некорректный id пользователя');
      }
      return serverError(res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return Users.create({ name, about, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return badRequestError(res, 'Введены некорректные данные');
      }
      return serverError(res);
    });
};

const updateUser = (req, res) => {
  const updateUserData = req.body;

  return Users.findByIdAndUpdate(
    req.user._id,
    updateUserData,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return notFoundError(res, 'Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return badRequestError(res, 'Введены некорректные данные');
      }
      return serverError(res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
};
