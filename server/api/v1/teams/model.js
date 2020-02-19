const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color1: {
    type: String,
    default: '',
  },
  color2: {
    type: String,
    default: '',
  },
};

const team = new Schema(fields, {
  timestamps: true,
});

module.exports = mongoose.model('team', team);
