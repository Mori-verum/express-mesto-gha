const Card = require('../models/cardSchema');
const {
  SUCCESS_CODE,
  NOT_FOUND_ERROR,
  INVALID_DATA_ERROR,
  SERVER_ERROR,
} = require('../utils/statusCode');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(SUCCESS_CODE).send(cards);
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send({ message: err.message });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.status(SUCCESS_CODE).send(card);
      } else {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Некорректный id карточки' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Некорректный id карточки' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.status(SUCCESS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(INVALID_DATA_ERROR).send({ message: 'Некорректный id карточки' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
