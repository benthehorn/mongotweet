'use strict';
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jwt-simple');

var User = require('../models/user');
var config = require('../config/database');
var jwtConfig = require('../config/jwtConfig').jwtConfig;

module.exports = function (passport) {
  var opts = {};
  opts.secretOrKey = jwtConfig.secret;
  opts.issuer = jwtConfig.issuer;
  opts.audience = jwtConfig.audience;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
      console.log('PAYLOAD: ' + jwtPayload);
      User.findOne({ userName: jwtPayload.sub }, function (err, user) {
          if (err) {
            return done(err, false);
          }

          if (user) {
            done(null, user);
          } else {
            done(null, false, 'User found in token not found');
          }
        });
    }));

};
