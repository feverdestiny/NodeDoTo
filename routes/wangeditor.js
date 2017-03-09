/**
 * Created by Administrator on 2017/3/6.
 */
var express = require('express');
var router = express.Router();
var Document = require('../models/documents.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Go IndexRoutes')
    res.render('wangeditor', {title: 'Express'});
});

router.post('/SaveDocument', function (req, res) {
    var name = req.body.name;
    var password = req.body.password
    var documentData = {
        documentTitle: req.body.documentTitle,
        documentContent: req.body.documentContent
    };
    Document.Save(documentData, function (err, result) {
        if (result.issuc) {
            res.locals.issuc = true;
            res.send(res.locals);
        } else {
            console.log(result);
            console.log(result);
            res.locals.issuc = false;
            res.locals.error = result.error;
            res.send(res.locals);
        }

    });
});
module.exports = router;