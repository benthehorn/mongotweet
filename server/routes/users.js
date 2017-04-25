'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwtConfig = require('../config/jwtConfig').jwtConfig;
var jwt = require('jwt-simple');
var sanitizeHtml = require('sanitize-html');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req, res) {
  var user = req.body.userName;
  var pass = req.body.password;

  if (!user || !pass) {
    res.json({ success: false, msg: 'Please pass name and password.' });
  } else {
    var newUser = new User({
      userName: user,
      password: pass
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        console.log('Error : ' + err);
        return res.json({ success: false, msg: 'Username already exists.' });
      }

      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});

router.post('/authenticate', function (req, res) {
  console.log('User in authenticate:' + req.body.userName);
  User.findOne({
    userName: sanitize(req.body.userName)
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ msg: 'Authentication failed. User not found. ' });
    }else {
      user.comparePassword(sanitize(req.body.password), function (err, isMatch) {
        if (isMatch && !err) {
          var iat = new Date().getTime() / 1000;
          var exp = iat + jwtConfig.tokenExpirationTime;
          var payload = {
            aud: jwtConfig.audience,
            iss: jwtConfig.issuer,
            iat: iat,
            exp: exp,
            sub: user.userName
          };
          var token = jwt.encode(payload, jwtConfig.secret);

          res.send(token);
        }else {
          res.status(401).send({ msg: 'Authentication failed. Wrong password !' });
        }
      });
    }
  });
});
//this function sanitizes the input and removes any tags using npm sanitize-html
function sanitize(input) {
  var dirty = input;
  var clean = sanitizeHtml(dirty);
  return clean;
}

module.exports = router;

