const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');

const { notFoundError } = require('../errors/errors');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => notFoundError(res, 'Страница не найдена'));

module.exports = router;
