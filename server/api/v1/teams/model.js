const mongoose = require('mongoose');

const team = {
  name: String,
  color1: String,
  color2: String,
};

module.exports = mongoose.model('team', team);
