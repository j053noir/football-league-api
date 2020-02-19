require('dotenv').config('');

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  }
};

module.exports = config;
