const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { NotFoundError } = require('../errors');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/*', (req, res, next) => next(new NotFoundError('Ресурс не найден')));

module.exports = router;
