const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const AuthError = require('../utils/errors/AuthError');
// const { validateUrl } = require('../utils/validateUrl');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    valid: {
      validator: validator.isUrl,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    valid: {
      validator: validator.isEmail,
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

// userSchema.statics.findByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new AuthError('Неверные логин или пароль пользователя'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new AuthError('Неверные логин или пароль пользователя'));
//           }
//           return user;
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
