/**
 * Created by Administrator on 2017/3/7.
 * 文本编辑
 */


var mysql = require('mysql');
var connection = require('./server');

function Document(document) {
    this.title = document.title;
    this.content = document.content;
}
module.exports = User;


//保存数据
Document.save = function save(data, callback) {

};