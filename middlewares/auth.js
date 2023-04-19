const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;
    payload = jwt.verify(token, 'user-secret-key');
  } catch (err) {
    next(new AuthError('Требуется авторизация'));
    return;
  }

  req.user = payload;

  next();
};
