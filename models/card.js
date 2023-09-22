const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator: (v) => !isURL(v),
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%]+#?$/.test(v),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
