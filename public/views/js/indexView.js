/**
 * Created by Administrator on 2017/3/2.
 */
$(function () {
    $(document).ready(function () {
        document.body.className = '';
    });


    $("#btnLog").click(function () {
        $("#btnLog").addClass("animated zoomOut")
        $('#btnLog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', logIn());
    });
    function logIn() {
        setTimeout(function () {
            $("#formlog").addClass("animated zoomIn")
            $("#formlog").show();
            $("#btnLog2").addClass("animated zoomIn")
            $("#btnLog2").show();

        }, 800);


    }

    $("#btnLog2").click(function () {
        var userName = $.trim($('#username').val());
        var userPassword = $.trim($('#userpassword').val());

        if(userName!=''&&userPassword!=''){
            console.log('go to login')
            $.ajax({
                type: 'POST',
                url: '/destiny',
                datatype:'json',
                data: {'username':MyInputValue},
                success: function(data) {
                    console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                }
            });
        }else
        {
            if(userName==''){
                alert('账号不能为空');
                $('#username').focus();
                return
            }
            if(userPassword==''){
                alert('密码不能为空');
                $('#userpassword').focus();
                return
            }

        }
    });



});