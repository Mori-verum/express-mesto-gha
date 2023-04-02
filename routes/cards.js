const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsControllers');
const { NOT_FOUND_ERROR } = require('../utils/statusCode');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
