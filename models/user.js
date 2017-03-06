/**
 * Created by Administrator on 2017/3/2.
 *
 * 查询用户信息
 */
var mysql = require('mysql');
var connection = require('./server');

function User(destiny) {
    this.name=destiny.name;
    this.password=destiny.password;
}
module.exports = User;


//保存数据
//保存数据
User.savec = function savec(name,password,callback) {
    var getUserInfo_SQL = "SELECT * FROM tb_user WHERE name = '" + name + "'";
    connection.query(getUserInfo_SQL, function (err, result) {
        if (err) {
            console.log("GetUserInfo Error: " + err.message);
            return;
        }
        if (result != "") {
            var insertUser_Sql = "INSERT INTO tb_user(name,password) VALUES('" + name + "','" + password + "')";

            connection.query(insertUser_Sql, function (err, results) {
                if (err) {
                    console.log("insertUser_Sql Error: " + err.message);
                    return;
                }

                //connection.release();

                console.log("invoked[save]");
                callback(err, results);
            });
        } else {
            callback(err, result);
        }
    });


};

//获取用户信息
User.GetUserInfo=function GetUserInfo(name,callback) {
    console.log('name:'+name);
    var getUserInfo_SQL = "SELECT * FROM tb_user WHERE name = '"+name+"'";
    connection.query(getUserInfo_SQL, function (err, result) {
        if (err) {
            console.log("GetUserInfo Error: " + err.message);
            return;
        }
        //connection.release();
        console.log("invoked[GetUserInfo]");
        callback(err,result);
    });
}

