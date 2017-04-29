'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Tweets = new Schema({
  polarity: {
    type: Number,
  },
  id: {
    type: Number,
    unique: true,
    required: true
  },
  date: {
    type: String

  },
  query: {
    type: String
  },
  user: {
    type: String
  },
  text: {
    type: String
  },
  mentions: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model('Tweet', Tweets);
