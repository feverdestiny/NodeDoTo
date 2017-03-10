/**
 * Created by Administrator on 2017/3/6.
 */



//

/**
 * alter提示信息
 * http://www.jq22.com/demo/sweetalert-master-150108224250/
 * type:"warning", "error", "success" and "info".
 *
 *
 * **/
    function swalAlter(title, type) {
        swal({
            title: title,
            type: type,
            confirmButtonText: "确定"
        });
    }

/**
 * window.open跳转获取参数,params传入window.location.href,paramName传入的是参数名
 *
 * **/
function GetUrlParms(paramName) {
    var argsIndex = window.location.href.indexOf("?");
    var arg = window.location.href.substring(argsIndex + 1);
    args = arg.split("&");
    var valArg = "";
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.split("=");

        if (arg.length <= 1) continue;
        if (arg[0] == paramName) {
            valArg = arg[1];
        }
    }
    return valArg;
}