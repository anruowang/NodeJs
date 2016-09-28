/**
 * Created by lenovo on 2016/9/22.
 */
$(function(){
    $("#loginpages input").focus(function(){
        $(this).css("border-color","#cle2be");
    });

    userIsLogin();//发送请求判断用户是否已经登录;
})

//打开登录窗口
function showLogin(){
    $("#uname").val("");
    $("#pwd").val("");
    $("#loginpages").mywin({left:"center","top":"center"});
    $("#zcpages").hide();
    $(".bg").fadeIn("200","linear");
}

//关闭层
function hidenloginpage(){
    $("#loginpages").hide();
    $(".bg").fadeOut();
}

//打开注册窗口
function showRegister(){
    $("#zcuname").val("");
    $("#zcpwd").val("");
    $("#zcpwdagain").val("");
    $("#zcpages").mywin({left:"center",top:"center"});
    $("#loginpages").hide();
    $(".bg").fadeIn("200","linear");
    $("#registertishi").html("");
}

//关闭注册窗口
function hidenzcpage(){
    $("#zcpages").hide();
    $(".bg").fadeOut();
}
//用户注册
function userzc(){
    var uname=$.trim($("#zcuname").val());
    var pwd= $.trim($("#zcpwd").val());
    var pwdagain= $.trim($("#zcpwdagain").val());

    $.post("userRegister",{uname:uname,pwd:pwd,pwdagain:pwdagain},function(data){
        data= $.trim(data);
        switch (data){
            case "1":$("#registertishi").text("用户名不能为空。。。");break;
            case "2":$("#registertishi").text("密码不能为空。。。");break;
            case "3":$("#registertishi").text("两次密码输入不一致。。。");break;
            case "4":$("#registertishi").text("数据库连接失败。。。");break;
            case "5":$("#registertishi").text("数据库添加失败。。。");break;
            case "6":$("#registertishi").text("注册成功。。。");hidenloginpage();
                break;
            default:$("#registertishi").text("注册失败。。。");break;
        }
    })
}

function userLogin(){
    var uname= $.trim($("#uname").val());
    var pwd= $.trim($("#pwd").val());
    if(uname==""){
        $("#uname").css("border-color","red");
        return ;
    }
    if(pwd==""){
        $("#pwd").css("border-color","red");
        return ;
    }

    $.post("userLogin",{uname:uname,pwd:pwd},function(data){
        data= $.trim(data);
        switch(data){
            case "1":$("#uname").css("border-color","red");break;
            case "2":$("#pwd").css("border-color","red");break;
            case "3":alert("数据库连接失败...");break;
            case "4":alert("数据查询失败。。。");break;
            case "5":alert("用户名或密码错误。。。");break;
            case "6":
                hiddenloginpage();
                var str='尊敬的会员:<a href="">['+uname+']</a>&nbsp;&nbsp;' +
                    '<a href="javascript:userOutLogin()"[注销]</a>&nbsp;&nbsp;<a href="back/goodstype.html"></a>';
                $("header").html(str);break;
            default:alert("登录失败。。");break;
        }
    },"text");
}

function checkInfos(obj,tabName,colName){
    var info=obj.value;
    if(info!=""){
        $.get("checkUserName",{uname:info,tabname:tabName,colName:colName},function(data){
            data= $.trim(data);
            if(data=="0"){
                $(obj).css("border-color","red");
                $(obj).next().eq(0).text("该用户已经被占用。。。");
            }
        });
    }else{
        $(obj).css("border-color","red");
    }
}

function checkUsername(){
    var uname= $.trim(obj.value);
    if(uname!=""){
        $.get("checkUserName",{uname:uname},function(data){
            data= $.trim(data);
            if(data=="0"){
                $(obj).css("border-color","green");
            }else{
                $(obj).css("border-color","red");
                $("#zcunamep").text("该用户已经被占用");
            }
        });
    }else{
        $(obj).css("border-color","red");
    }
}

function userIsLogin(){//判断用户是否已经登录
    $.get("userIsLogin",null,function(data){
        data= $.trim(data);
        var str;
        if(data!="0"){
            str='尊敬的会员：<a href="">['+data+']</a>' +
                '&nbsp;&nbsp;<a href="javascript:userOutLogin()">[注销]</a>' +
                '&nbsp;<a href="back/goods.html">[后台管理]</a> '
        }else{
            str+='<a href="javascript:showLogin()">[请先登录]</a>' +
                '&nbsp;<a href="javascript:showRegister()">[立即注册]</a>'
        }
        $("header").html(str);
    })
}