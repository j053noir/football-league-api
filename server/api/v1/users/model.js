const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

const { Schema } = mongoose;

const fields = {
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: props => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, '"password" must be at least 6 characters long'],
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    trim: true,
    default: '',
  },
  photo_url: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  role: {
    type: String,
    default: 'player',
    enum: ['admin', 'player'],
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

const blackListFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  blackListFields.forEach(field => {
    if (Object.hasOwnProperty.call(doc, fields)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', function save(next) {
  if (this.isNew || this.isModified('password')) {
    hash(this.password, 10).then(hashText => {
      this.password = hashText;
      next();
    });
  } else {
    next();
  }
});

user.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next('ValidationError: There was a duplicate key error');
  } else {
    next();
  }
});

user.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
