const router = require('express').Router();

router.route('/').get((req, res, next) => {
  res.json({
    message: 'Welcome to the API V1',
  });
});

router.route('/users').get((req, res, next) => {
  res.json({
    message: 'GET all users',
  });
});
