var express = require('express');
var router = express.Router();
User = require('../models/user.js'),

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Go IndexRoutes')
  res.render('index', { title: 'Express' });
});

module.exports = router;
