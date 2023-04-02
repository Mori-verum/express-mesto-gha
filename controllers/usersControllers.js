const User = require('../models/userSchema');
const {
  SUCCESS_CODE,
  NOT_FOUND_ERROR,
  INVALID_DATA_ERROR,
  SERVER_ERROR,
} = require('../utils/statusCode');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточки не найдены' });
      }
      res.status(SUCCESS_CODE).send(users);
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send(err.message);
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_DATA_ERROR).send(err.message);
      }
      res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};
