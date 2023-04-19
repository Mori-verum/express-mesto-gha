const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { validateUserBody, validateLoginParametrs } = require('./utils/validateRequestParameters');
const routes = require('./routes/index');
const {
  createUser,
  login,
} = require('./controllers/usersControllers');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signin', validateLoginParametrs, login);
app.post('/signup', validateUserBody, createUser);

// app.use(auth);
app.use(routes);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка...'
        : message,
    });
  next();
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
