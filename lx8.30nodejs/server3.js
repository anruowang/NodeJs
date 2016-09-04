/**
 * Created by Administrator on 2016/8/30.
 */
var http=require("http");//npm
var events=require("events");
var server=http.createServer();//创建一个http服务器

var testFun=function(req,res){//客户端每发送一次请求 ，就会触发事件一次
    if(req.url!="/favicon.ico"){
        console.info("接收到了客户端获取图标的信息。。。");
    }
};

server.on("request",function(req,res){//客户端每发送一次请求 ，就会触发事件一次
    if(req.url!="/favicon.ico"){
        console.info("发送响应信息。。。");
        res.write("<!doctype html><head><title>哈哈</title><meta charset='utf-8' /></head");
        res.write("<body><h1>欢迎欢迎...</h1></body>");
        res.end();
    }
});

server.once("request",function(req,res){//客户端每发送一次请求 ，就会触发事件一次
    if(req.url!="/favicon.ico"){
        console.info("发送响应完毕。。。");//once 只会触发一次
    }
});




server.on("request",testFun);
server.removeListener("request",testFun);//移除request上的testFun事件处理函数
//在默认情况下，针对同一个事件，最多可以绑定10个事件处理函数，可以通过setMaxListeners方法修改最多可以绑定的事件处理函数
server.listen(8888);
console.info(events.EventEmitter.listenerCount(server,"request"));//统计有多少个事件，移除掉了一个ereu