/**
 * Created by Administrator on 2017/3/6.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Go IndexRoutes')
    res.render('wangeditor', {title: 'Express'});
});

module.exports = router;