const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Требуется авторизация'));
    return;
  }

  try {
    payload = jwt.verify(token, 'user-secret-key');
  } catch (err) {
    next(new AuthError('Требуется авторизация'));
    // console.log(token);
    return;
  }

  req.user = payload;

  next();
};
