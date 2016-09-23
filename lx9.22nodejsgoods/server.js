/**
 * Created by lenovo on 2016/9/22.
 */
var express=require("express");//创建服务器
var cookieparser=require("cookie-parser");//cookie
var session=require("express-session");//session
var mysql=require("mysql");//操作数据库
var fs=require("fs");//操作文件或目录
var bodyparser=require("body-parser");//处理请求的
var multer=require("multer");//处理文件上传的

var app=express();//创建一个应用程序
//使用静态中间件
app.use(express.static("page"));//默认到page文件夹下查找静态资源

//配置和使用bodyparser
app.use(bodyparser.urlencoded({extended:false}));

//
app.use(session({
    secret:'keyboard cat',//
    resave:true,//
    saveUnintialized:true,//
    cookie:{secure:false,maxAge:1000*60*2}//
}));

//
var upload=multer({dest:"./page/pic"});//

//
var pool=mysql.createPool({
    host:"127.0.0.1",
    post:3306,
    database:"goods",
    user:"root",
    password:"1"
});

//
app.post("/userRegister",function(req,res){
    var result="0";
    if(req.body.uname==""){
        res.send("1");//
    }else if(req.body.pwd==""){
        res.send("2");//
    }else if(req.body.pwd!=req.body.pwdagain){
        res.send("3");//
    }else {//
        pool.getConnection(function(err,connection){
            if(err){
                res.send("4");//
            }else {
                connection.query("insert into adminInfo values(0,?,?)",[req.body.uname,req.body.pwd],function(err){
                    if(err){
                        res.send("5");
                    }else {
                        res.send("6");
                    }
                })
            }
        })
    }
})
app.listen(8001,function(err){
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功。。。");
    }
});