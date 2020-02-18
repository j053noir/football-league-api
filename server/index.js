const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');

const app = express();

app.use(requestId);
app.use(logger.requests);

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.use((req, res, next) => {
  const message = 'Error. Route not found';
  const statusCode = 404;

  logger.warn(message);
  res.status(statusCode);
  res.json({
    message,
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  logger.error(err);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
