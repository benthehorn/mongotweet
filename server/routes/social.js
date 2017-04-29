'use strict';

var express = require('express');
var router = express.Router();

var jwtConfig = require('../config/jwtConfig').jwtConfig;
var jwt = require('jwt-simple');
var sanitizeHtml = require('sanitize-html');
var db = require('../config/db');
var tweet = require('../models/social');

router.get('/one', function (req, res, next) {
  tweet.find({ user: '_TheSpecialOne_' }, function (err, data) {
    res.send(data);
  });
});

router.get('/numberOfUsers', function (req, res, next) {
  tweet.find().distinct('user').count(function (err, data) {
    console.log(data);
    res.json({ numberOfUsers: data });
  });

});

router.get('/userNames', function (req, res, next) {
  var mentions = [];
  //add mentions: {$mentions} to get the manes of the mentioned people
  tweet.aggregate([
      { $unwind: '$mentions' },
      { $group: { _id: '$user',  size: { $sum: 1 } } },
      { $sort: { size: -1 } },
      { $limit: 10 }]).allowDiskUse(true).exec(function (err, data) {
    if (err) {
      return console.log('error', err);
    }

    res.json(data);
  });

});

module.exports = router;
