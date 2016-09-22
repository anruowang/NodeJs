/**
 * Created by Administrator on 2016/9/21.
 */
var express=require("express");
var cookieparser=require("cookie-parser");
var bodyparser=require("body-parser");
var session=require("express-session");

var app=express();
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());//启用cookie


app.post("/userLogin",function(req,res){
    session.uname=req.body.uname;
    session.pwd=req.body.pwd;
    res.end("1");
});

app.get("/currentUserNname",function(req,res){
    res.send("当前登录用户："+session.uname);
});

app.listen(8889,function(err){
    if(err){
        console.info(err);
    }else{
        console.info("服务器启动成功。。。");
    }
});