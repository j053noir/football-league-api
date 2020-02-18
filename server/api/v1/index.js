const router = require('express').Router();

const users = require('./users/routes');

router.route('/').get((req, res, next) => {
  res.json({
    message: 'Welcome to the API V1',
  });
});

router.use('/users', users);
