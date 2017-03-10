/**
 * Created by Administrator on 2017/3/9.
 */

$(function () {
    var editor;
    editor = new wangEditor('documentContent');
    editor.create();
    // init();
    $('#documentSave').on('click', function () {
        var documentContent = editor.$txt.html();
        $.ajax({
            type: 'POST',
            url: '/wangeditor/savedoucment',
            datatype: 'json',
            data: {
                documentTitle: $('#documentTitle').val(),
                documentContent: documentContent
            },
            success: function (data) {
                console.log(data);
                if (data.issuc) {
                    swalAlter('保存成功', 'success');
                }
                else {
                    swalAlter(data.error, 'warning');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    })

    $('#getDocumentTitle').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/wangeditor/GetDocumentTitle',
            datatype: 'json',
            data: {},
            success: function (data) {
                console.log(data);
                if (data.issuc) {
                    swalAlter('获取成功', 'success');
                }
                else {
                    swalAlter(data.error, 'warning');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });

})

function init() {
    initEditor();
}

function initEditor() {

}


