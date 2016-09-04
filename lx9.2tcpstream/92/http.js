/**
 * Created by Administrator on 2016/9/2.
 */
///var http=require("http");
//var server=http.createServer(function(req,res){
//    console.info("有人连接上来了");
//    //res.write("<meta charset='utf-8 />");
//    res.write("hhhh");
//    res.end();
//}).listen(6666,function(){
//    console.info("服务器已经启动。。。");
//});

var server=require("http").createServer().listen(6666,function() {
    console.info("服务器已经启动");
});
server.on("request",function(req,res){
    console.info("有人连接上来了");
    res.write("<meta charset='utf-8'/>");
    res.write("哈哈，暗暗");
    res.end();
    server.close();//关闭服务器
});

server.on("connection",function(socket){
    console.info(socket.address().address);
});


server.on("close",function(){
    console.info("服务器被关闭");
})

server.on("error",function(err){
    console.info(err);
    if(err.code=="EADDRINUSE"){
        console.info("端口被占用。。");
    }
});

