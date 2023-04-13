const router = require('express').Router();

const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { NotFoundError } = require('../utils/errors');

router.use('/users', userRoutes);
router.use('/cards', cardsRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
