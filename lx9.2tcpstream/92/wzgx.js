/**
 * Created by Administrator on 2016/9/2.
 */
var http=require("http");
var fs=require("fs");

var server=http.createServer().listen(6666,function() {
    console.info("服务器已经启动");
});

//当有客户端请求时，触发这个事件
//server.on("request",function(req,res){
//    //console.info("./temp.txt",function(err,data){
//    console.info("."+req.url,function(err,data){
//        if(!err){
//            res.write("<meta charset='utf-8'/>");
//            res.write(data.toString());
//            res.end();
//        }else {
//            console.info(err);
//        }
//    });
//    //server.close();关闭服务器
//});

server.on("request",function(req,res){
    console.info(req.method);//提交方式
    console.info(req.httpVersion);//协议版本
    console.info(req.url);//请求资源
    console.info(req.headers);//获取请求头信息

    if("/favicon.ico"!=req.url){
        var file=fs.createReadStream("."+req.url);
        file.on("data",function(data){
            res.write(data);
        });

        file.on("end",function(){
            res.end();
        })
    }
})



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

