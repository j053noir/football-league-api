const mongoose = require('mongoose');

const config = require('./config');
const logger = require('./config/logger');


exports.connect = () => {
  const { database } = config;
  const url = `mongodb://${database.username}:${database.password}@${database.url}`;

  logger.info('Connecting to database...');

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, autoReconnect: true });

  mongoose.connection.on('open', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('Database reconnected');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Database disconnected');
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoReconnect: true,
    });
  });

  mongoose.connection.on('error', err => {
    logger.info(`Database connection error: ${err}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database connection disconnected through app termination');
      process.exit(0);
    });
  });
};
