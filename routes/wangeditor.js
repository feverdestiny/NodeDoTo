/**
 * Created by Administrator on 2017/3/6.
 */
var express = require('express');
var router = express.Router();
Document = require('../models/documents.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Go IndexRoutes')
    res.render('wangeditor', {title: 'Express'});
});

router.post('/savedoucment', function (req, res, next) {

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

router.post('/GetDocumentTitle', function (req, res, next) {
    Document.GetDocumentInfo(function (err, result) {
        if (result.issuc) {
            res.locals.issuc = true;
            res.locals.data = result;
            res.send(res.locals);
        } else {
            console.log(result);
            res.locals.issuc = false;
            res.locals.error = result.error;
            res.send(res.locals);
        }

    });
});
module.exports = router;