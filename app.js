const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { validateUserBody, validateLoginParametrs } = require('./utils/validateRequestParameters');
const routes = require('./routes/index');
const {
  createUser,
  login,
  logout,
} = require('./controllers/usersControllers');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', validateLoginParametrs, login);
app.post('/signup', validateUserBody, createUser);
app.get('/signout', logout);

app.use(routes);

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
