'use strict';

var express = require('express');
var router = express.Router();

var jwtConfig = require('../config/jwtConfig').jwtConfig;
var jwt = require('jwt-simple');
var sanitizeHtml = require('sanitize-html');
var db = require('../config/db');


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;