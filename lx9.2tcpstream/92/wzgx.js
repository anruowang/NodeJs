/**
 * Created by Administrator on 2016/9/2.
 */
var http=require("http");

var server=http.createServer().listen(6667,function() {
    console.info("服务器已经启动");
});

//当有客户端请求时，触发这个事件
server.on("request",function(req,res){
    //console.info("./temp.txt",function(err,data){
    console.info("."+req.url,function(err,data){
        if(!err){
            res.write("<meta charset='utf-8'/>");
            res.write(data.toString());
            res.end();
        }else {
            console.info(err);
        }
    });
    //server.close();关闭服务器
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

