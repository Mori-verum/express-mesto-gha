const cardsRouter = require('express').Router();
const { validateCardBody, validateCardId } = require('../utils/validateRequestParameters');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsControllers');

cardsRouter.get('/', getCards);

cardsRouter.post('/', validateCardBody, createCard);

cardsRouter.delete('/:cardId', validateCardId, deleteCard);

cardsRouter.put('/:cardId/likes', validateCardId, likeCard);

cardsRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRouter;
