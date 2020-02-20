const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  number: {
    type: Number,
    unique: true,
  },
};

const references = {
  event: {
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team',
    required: true,
  },
};


const teamMember = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

teamMember.index({ event: 1, player: 1, team: 1 }, { unique: true });

teamMember.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next('ValidationError: There was a duplicate key error');
  } else {
    next();
  }
});

module.exports = {
  Model: mongoose.model('team_member', teamMember),
  fields,
};
