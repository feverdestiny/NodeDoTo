var express = require('express');
var router = express.Router();
User = require('../models/user.js'),

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Go IndexRoutes')
  res.render('index', { title: 'Express' });
});

router.post('/userinfo', function(req, res) {
  var name=req.body.name;
  var password=req.body.password
  User.GetUserInfo(req.body.name,function (err,result) {
    if(result == ''){
      res.locals.issuc=false;
      res.locals.error = '查询不到对应数据！';
      res.send( res.locals);
    }else{
      if(result[0].name != name || result[0].password != password){
        res.locals.issuc=false;
        res.locals.error='账号或密码错误';
      }else{
        res.locals.issuc=true;
        // res.locals.result=true
      }
      res.send( res.locals);
    }
  })
});

router.post('/RegesterUser', function(req, res) {
  var name=req.body.name;
  var password=req.body.password;
  User.savec(name,password,function (err,result) {
    if(result == ''){
      console.log(result);
      res.locals.issuc=false;
      res.locals.error = '注册失败，请重试';
      res.send( res.locals);
    }else{
   console.log(result);
      res.send( res.locals);
    }

  });
});
module.exports = router;
