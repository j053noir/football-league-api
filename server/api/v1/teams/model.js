const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

team.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next('ValidationError: There was a duplicate key error');
  } else {
    next();
  }
});

module.exports = {
  Model: mongoose.model('team', team),
  fields,
};
