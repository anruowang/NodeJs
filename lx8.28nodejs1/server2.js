/**
 * Created by Administrator on 2016/8/29.
 */
var http=require("http");//npm
var server=http.createServer();//创建一个http服务器
server.on("request",function(req,res){//客户端每发送一次请求 ，就会触发事件一次
    console.info(req.url);
    res.write("<meta charset='utf-8'/>");
    res.info("谢谢访问。。。");
    res.end();
});

server.listen(6666);//启动服务器，并监听6666端口