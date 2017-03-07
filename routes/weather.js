/**
 * Created by Administrator on 2017/3/7.
 */
/**
 * Created by Administrator on 2017/3/6.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Go weatherRoutes')
    res.render('weather', {title: 'Express'});
});

module.exports = router;