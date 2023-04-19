const usersRouter = require('express').Router();
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validateRequestParameters');
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/usersControllers');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me', validateUserInfo, updateUser);

usersRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);

usersRouter.get('/:userId', validateUserId, getUser);

module.exports = usersRouter;
