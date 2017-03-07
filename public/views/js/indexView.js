/**
 * Created by Administrator on 2017/3/2.
 */
$(function () {
    $(document).ready(function () {
        document.body.className = '';
    });


    $("#btnLog").click(function () {
        $("#divlog").addClass("animated zoomOut")
        $('#divlog').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', logIn());
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

            isuser(userName, userPassword);

        }else
        {
            if(userName==''){
                // alert('账号不能为空');
                swalAlter('账号不能为空', 'warning');
                $('#username').focus();
                return
            }
            if(userPassword==''){
                // alert('密码不能为空');
                swalAlter('密码不能为空', 'warning');
                $('#userpassword').focus();
                return
            }

        }
    });
    //判断用户信息
    function isuser(userName, userPassword) {
        $.ajax({
            type: 'POST',
            url: '/userinfo',
            datatype: 'json',
            data: {
                'name': userName,
                'password': userPassword
            },
            success: function (data) {
                console.log(data);
                if (data.issuc) {
                    swalAlter('登陆成功', 'success');
                    var userData = {
                        islogin: true,
                        name: userName
                    }
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                } else {
                    swalAlter(data.error, 'warning');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }

    //注册
    $('#btnRegister').click(function () {
        $('#MainLogin').hide();
        $('#RegetierLogin').show();
        $('#RegetierLogin') .addClass("animated fadeInUp")
    });
    $('#RbtnLog').click(function () {
        var rname= $.trim($('#Rusername').val());
        var rpassword1=$.trim($('#Ruserpassword1').val());
        var rpassword2=$.trim($('#Ruserpassword2').val());

        if(rname!=""&rpassword1!=""&rpassword2!=""){

            $.ajax({
                type: 'POST',
                url: '/RegesterUser',
                datatype:'json',
                data: {'name':rname,
                    'password':rpassword1},
                success: function(data) {
                    console.log(data);
                    if (data.issuc) {
                        swalAlter('注册成功', 'success');
                    }
                    else {
                        swalAlter(data.error, 'warning');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                }
            });
        }else {
            if(rname==''){
                // alert('账号不能为空');
                swalAlter('账号不能为空', 'warning');
                $('#Rusername').focus();
                return
            }
            if(rpassword1==''){
                // alert('密码不能为空');
                swalAlter('密码不能为空', 'warning');
                $('#Ruserpassword1').focus();
                return
            }
            if(rpassword2==''){
                // alert('密码不能为空');
                swalAlter('密码不能为空', 'warning');
                $('#Ruserpassword2').focus();
                return
            }
        }


    });
    
});