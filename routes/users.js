const router = require('express').Router();
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validateRequestParameters');
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/usersControllers');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', validateUserId, getUser);

router.patch('/me', validateUserInfo, updateUser);

router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
