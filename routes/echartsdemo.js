/**
 * Created by Administrator on 2017/3/3.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('Go ecartsRouter')
    res.render('echartsDemo', { title: 'Express' });
});

module.exports = router;
