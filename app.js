const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const publicRoutes = require('./routes/auth');
const privateRoutes = require('./routes/index');
// const {
//   login,
//   createUser,
// } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

// req limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// security and validation
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post(
//   '/signin',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required(),
//     }),
//   }),
//   login,
// );
// app.post(
//   '/signup',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required(),
//       name: Joi.string().min(2).max(30),
//       about: Joi.string().min(2).max(30),
//       avatar: Joi.string().regex(/^https?:\/\/(www)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%]+#?$/),
//     }),
//   }),
//   createUser,
// );

// auth and routes
app.use(publicRoutes);
app.use(auth);
app.use(privateRoutes);

// errors
app.use(errors({ message: 'Введены некорректные данные' }));
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
