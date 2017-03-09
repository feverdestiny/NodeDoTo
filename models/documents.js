/**
 * Created by Administrator on 2017/3/7.
 * 文本编辑
 */


var mysql = require('mysql');
var connection = require('./server');
var uuid = require('node-uuid');

function Document(document) {
    this.title = document.title;
    this.content = document.content;
}
module.exports = Document;


//保存数据
Document.Save = function Save(data) {

    var insertDocument_Sql = "INSERT INTO tb_document(documentId,documentTitle,documentContent) VALUES('"
        + uuid.v1() + "','"
        + data.documentTitle + "','"
        + data.documentContent + "')";

    connection.query(insertDocument_Sql, function (err, results) {
        if (err) {
            console.log("insertDocument_Sql Error: " + err.message);
            return;
        }
        //connection.release();

        console.log("invoked[save]");
        results.issuc = true;
        callback(err, results);
    });
};

//获取用户信息
Document.GetDocumentInfo = function GetDocumentInfo(name, callback) {
    console.log('name:' + name);
    var getUserInfo_SQL = "SELECT * FROM tb_user WHERE name = '" + name + "'";
    connection.query(getUserInfo_SQL, function (err, result) {
        if (err) {
            console.log("GetUserInfo Error: " + err.message);
            return;
        }
        //connection.release();
        console.log("invoked[GetUserInfo]");
        callback(err, result);
    });
}