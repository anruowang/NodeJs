/**
 * Created by lenovo on 2016/9/4.
 */
var http=require("http");
var querystring=require("querystring");
var  fs=require("fs");
var url=require("url");

var server=http.createServer().listen(8889,function(){
    console.info("服务器已经启动...");
});

//当有客户端请求时，触发这个事情
server.on("request",function(req,res) {
    if (req.url != '/favicon.ico') {
        var urlObj = url.parse(req.url);//把请求地址变成一个对象
        console.info(urlObj);
        //console.info(urlObj);
        //根据不同的请求地址，进行不同处理并返回不同的结果
        if (urlObj.pathname == "/") {//默认返回index2.html
            readFile("./index2.html", res)
        } else if (urlObj.pathname == "/addUser") {//
            //
            var dataObj = querystring.parse(urlObj.query);
            if (dataObj.uname == "yc" && dataObj.pwd == "123") {
                readFile("./success.html", res);
            } else {
                readFile("./error.html", res);
            }
        }
            }
});
function readFile(path,res){
    var file=fs.createReadStream(path);
    file.on("data",function(data){
        res.write(data);
    });
    file.on("end",function(){
        res.end();
    })
}

server.on("close",function(){
    console.info("服务器被关闭。。。");
});
server.on("error",function(err){  //端口号被占用,出错的时候，准确的告诉客户到底是怎样启动错误。
    console.info(err);
    if(err.code=="EADDRINUSE"){
        console.info("端口号被占用。。。");
    }
});