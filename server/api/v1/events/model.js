const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  type: {
    type: String,
    default: 'league',
    enum: ['league', 'tournament'],
  },
};

const event = new Schema(fields, {
  timestamps: true,
});

event.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next('ValidationError: There was a duplicate key error');
  } else {
    next();
  }
});

module.exports = {
  Model: mongoose.model('event', event),
  fields,
};
