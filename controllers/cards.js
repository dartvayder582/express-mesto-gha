const Cards = require('../models/card');
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require('../errors');

const getCards = (req, res, next) => Cards.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Cards.create(
    {
      name,
      link,
      owner: req.user._id,
    },
  )
    .then((newCard) => res.status(201).send(newCard))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Cards.findById(cardId)
    .then((checkCard) => {
      if (!checkCard) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else if (checkCard.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }

      return Cards.deleteOne(checkCard)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError('Некорректный id карточки'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
