/**
 * Created by Administrator on 2017/3/10.
 */

var express = require('express');
var router = express.Router();
Document = require('../models/documents.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Go IndexRoutes')
    res.render('documentInfo', {title: 'Express'});
});

router.post('/GetDocumentInfoById', function (req, res, next) {
    var documentId = req.body.documentId;
    Document.GetDocumentInfoById(documentId, function (err, result) {
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