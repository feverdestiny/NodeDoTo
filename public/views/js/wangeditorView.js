/**
 * Created by Administrator on 2017/3/9.
 */

$(function () {
    var editor;
    init();
})

function init() {
    initEditor();
}

function initEditor() {
    editor = new wangEditor('documentContent');
    editor.create();
}


$('#documentSave').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/SaveDocument',
        datatype: 'json',
        data: {
            'documentTitle': $('#documentTitle').val(),
            'documentContent': editor.$txt.html()
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