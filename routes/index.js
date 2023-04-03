const router = require('express').Router();

const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { NOT_FOUND_ERROR } = require('../utils/statusCode');

router.use('/users', userRoutes);
router.use('/cards', cardsRoutes);
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
