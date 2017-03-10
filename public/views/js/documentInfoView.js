/**
 * Created by Administrator on 2017/3/10.
 */
$(function () {
    var documentId = '';

    init();

    function init() {
        documentId = GetUrlParms('documentId');
        console.log(documentId);
        GetDocumentInfo(documentId);
    }

    function GetDocumentInfo(documentId) {
        $.ajax({
            type: 'POST',
            url: '/document/GetDocumentInfoById',
            datatype: 'json',
            data: {documentId: documentId},
            success: function (data) {
                console.log(data);
                if (data.issuc) {
                    // swalAlter('获取成功', 'success');
                    DataToView(data.data[0]);
                }
                else {
                    swalAlter(data.error, 'warning');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }

    function DataToView(data) {
        $('#DocumentTitle').text(data.documentTitle);
        $('#DocumentContent').html(data.documentContent);
    }


});

