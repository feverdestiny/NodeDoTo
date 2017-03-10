/**
 * Created by Administrator on 2017/3/10.
 */
$(function () {

    init();

});

function init() {
    getDocument();
}
function getDocument() {
    var loader = new SVGLoader(document.getElementById('loader'), {speedIn: 400, easingIn: mina.easeinout});
    $('.container').removeClass('show')
    loader.show();
    $.ajax({
        type: 'POST',
        url: '/home/GetDocumentTitle',
        datatype: 'json',
        data: {},
        success: function (data) {
            console.log(data);
            if (data.issuc) {
                // swalAlter('获取成功', 'success');
                BuildDocument(data.data);
            }
            else {
                swalAlter(data.error, 'warning');
            }
            $('.container').addClass('show')
            loader.hide();
            $('#loader').removeClass('pageload-loading')
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

}

function BuildDocument(data) {
    $('#documentDiv').empty()
    var documentDiv = document.getElementById('documentDiv')
    console.log(data);
    for (x in data) {
        var objItem = document.createElement('div')
        objItem.setAttribute('class', 'media')
        var objMediaLeft = document.createElement('div')
        objMediaLeft.setAttribute('class', 'media-left')
        var objMediaBody = document.createElement('div')
        objMediaBody.setAttribute('class', 'media-body')
        var objMediaImage = document.createElement('img')
        objMediaImage.setAttribute('class', 'media-object')
        objMediaImage.setAttribute('src', '../views/images/8346742.png')
        objMediaImage.setAttribute('width', '60')
        objMediaImage.setAttribute('height', '60')
        var objMediaBodyh = document.createElement('a')
        objMediaBodyh.setAttribute('class', 'title')
        objMediaBodyh.setAttribute('href', '/document?documentId=' + data[x].documentId);
        objMediaBodyh.innerHTML = data[x].documentTitle;
        objMediaLeft.appendChild(objMediaImage);
        objMediaBody.appendChild(objMediaBodyh)
        objItem.appendChild(objMediaLeft);
        objItem.appendChild(objMediaBody);
        documentDiv.appendChild(objItem);
    }
}



