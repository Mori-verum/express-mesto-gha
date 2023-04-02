const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/usersControllers');
const { NOT_FOUND_ERROR } = require('../utils/statusCode');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
