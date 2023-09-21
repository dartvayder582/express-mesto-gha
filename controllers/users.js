const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const {
  NotFoundError,
  BadRequestError,
  UserExistError,
  NotAuthError,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(() => {
      next(new NotAuthError('Неправильные почта или пароль'));
    });
};

const getUsers = (req, res, next) => Users.find({})
  .then((users) => res.send(users))
  .catch(next);

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  return Users.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный id пользователя'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => Users.findById(req.user._id)
  .then((userData) => res.send(userData))
  .catch(next);

const createUser = (req, res, next) => {
  const newUser = req.body;
  return Users.findOne({ email: newUser.email })
    .then((checkUser) => {
      if (checkUser) {
        throw new UserExistError('Пользователь с таким e-mail уже существует');
      }
      return bcrypt.hash(newUser.password, 10)
        .then((hash) => Users.create({
          email: newUser.email,
          password: hash,
        }))
        .then(({ _id }) => {
          res.status(201).send({ _id });
        })
        .catch(next);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
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
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  getCurrentUser,
};
