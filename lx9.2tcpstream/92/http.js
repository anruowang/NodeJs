/**
 * Created by Administrator on 2016/9/2.
 */
//var http=require("http");
//var server=http.createServer(function(req,res){
//    console.info("有人连接上来了");
//    res.write("<meta charset='utf-8' />");
//    res.write("哈哈");
//    res.end();
//}).listen(6666,function(){
//    console.info("服务器已经启动。。。");
//});
//
//var server=http.createServer().listen(6667,function(){
//    console.info("服务器已经启动");
//});
//server.on("request",function(req,res){
//    console.info("有人连接上来了");
//    res.write("<meta charset='utf-8'/>");
//    res.write("哈哈mmmmm");
//    res.end();
//});
///////////////////////////两种方式连接？？

var server=require("http").createServer().listen(6666,function(){
    console.info("服务器已经启动");
});
server.on("request",function(req,res){
    console.info("有人连接上来了");
    res.write("<meta charset='utf-8'/>");
    res.write("哈哈mmmmm");
    res.end();
});

