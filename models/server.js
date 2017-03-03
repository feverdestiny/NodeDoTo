/**
 * Created by Administrator on 2017/3/3.
 */
var mysql=require("mysql");
var settings = require('../config');

var pool = mysql.createPool({
    host: settings.mysql.host,
    user: settings.mysql.user,
    password: settings.mysql.password,
    database: settings.mysql.database,
    port: settings.mysql.port,
    insecureAuth: true,     //加入此项可解决此错误！！！
});

pool.query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};
pool.queryArgs=function(sql,args,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,args,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};
module.exports=pool;