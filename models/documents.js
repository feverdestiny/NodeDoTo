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
Document.Save = function Save(data, callback) {
    var Dateuuid = uuid.v1();
    var insertDocument_Sql = "INSERT INTO tb_document(documentId,documentTitle,documentContent) VALUES('"
        + Dateuuid + "','"
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

//获取所有文档信息
Document.GetDocumentInfo = function GetDocumentInfo(callback) {
    var getDocumentTitle_SQL = "SELECT documentId,documentTitle FROM tb_document ";
    connection.query(getDocumentTitle_SQL, function (err, result) {
        if (err) {
            console.log("GetDocumentInfo Error: " + err.message);
            return;
        }
        //connection.release();
        console.log("invoked[GetDocumentInfo]");
        result.issuc = true;
        callback(err, result);
    });
}

//通过documentId获取对应的文档信息
Document.GetDocumentInfoById = function GetDocumentInfoById(documentId, callback) {
    var getDocumentInfoById_SQL = "SELECT * FROM tb_document WHERE documentId = '" + documentId + "'";
    connection.query(getDocumentInfoById_SQL, function (err, result) {
        if (err) {
            console.log("GetDocumentInfoById Error: " + err.message);
            return;
        }
        //connection.release();
        console.log("invoked[GetDocumentInfoById]");
        result.issuc = true;
        callback(err, result);
    });
}