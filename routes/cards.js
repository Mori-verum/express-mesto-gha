const router = require('express').Router();
const { validateCardBody, validateCardId } = require('../utils/validateRequestParameters');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsControllers');

router.get('/', getCards);

router.post('/', validateCardBody, createCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, likeCard);

router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
