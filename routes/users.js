const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getUsers,
  // createUser,
  updateUser,
  updateAvatar,
  // login,
  getCurrentUser,
} = require('../controllers/usersControllers');
const regex = require('../utils/linkValidation');

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
}), getUser);

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(regex).required(),
  }),
}), updateAvatar);

module.exports = router;
