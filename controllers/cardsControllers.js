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
      if (!cards) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточки не найдены' });
      }
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
        res.status(INVALID_DATA_ERROR).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.status(SUCCESS_CODE).send(card))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => res.status(SUCCESS_CODE).send(card))
    .catch(() => res.status(SERVER_ERROR).sres({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
