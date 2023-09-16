const Cards = require('../models/card');
const { notFoundError, badRequestError, serverError } = require('../errors/errors');

const getCards = (req, res) => Cards.find({})
  .then((cards) => res.send(cards))
  .catch(() => serverError(res, 'На сервере произошла ошибка'));

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Cards.create(
    {
      name,
      link,
      owner: req.user._id,
    },
  )
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return badRequestError(res, 'Введены некорректные данные');
      }
      return serverError(res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Cards.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return notFoundError(res, 'Запрашиваемая карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return badRequestError(res, 'Некорректный id карточки');
      }
      return serverError(res);
    });
};

const addLikeCard = (req, res) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return notFoundError(res, 'Запрашиваемая карточка не найдена');
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return badRequestError(res, 'Переданы некорректные данные');
    }
    return serverError(res);
  });

const deleteLikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return notFoundError(res, 'Запрашиваемая карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return badRequestError(res, 'Переданы некорректные данные');
      }
      return serverError(res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
