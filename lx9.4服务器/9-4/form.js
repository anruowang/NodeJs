/**
 * Created by Administrator on 2016/9/2.
 */
var http=require("http");
var querystring=require("querystring");
var fs=require("fs");
var url=require("url");

var server=http.createServer().listen(8888,"127.0.0.1",function() {
    console.info("服务器已经启动");
});

//当有客户端请求时，触发这个事件
//第一次访问
//server.on("request",function(req,res){
//    if(req.url!='/favicon.ico'){
//        console.info(url.parse(req.url));
//        if(req.url=="/"){//默认返回index.html
//            var file=fs.createReadStream("./index.html");
//            file.on("data",function(data){
//                res.write(data);
//            });
//            file.on("end",function(){
//                res.end();
//            })
//        }


//第二次
server.on("request",function(req,res){
    if(req.url!='/favicon.ico'){
        var urlObj=url.parse(req,url);//把请求地址变成一个对象
        //console.info(urlObj);
        //根据不同的请求地址，进行不同的处理并返回不同的结果
        if(urlObj.pathname=="/"){//默认返回index.html
            readFile("./index.html",res)
        }else if(urlObj.pathname=="/addUser"){//如果是添加用户请求
            //先获取用户名和密码
            var dataObj=querystring.parse(urlObj.query);
            if(dataObj.uname=="yc" && dataObj.pwd=="123"){
                readFile("./success.html",res);
            }else{
                readFile("./error.html",res);
            }
            //file.on("data",function(data){
            //    res.write(data);
            //});
            //file.on("end",function(){
            //    res.end();
            //})
        }else if(urlObj.pathname=="/showreg"){//说明用户是注册，服务器应该返回注册页面给他
            readFile("./reg.html",res);
        }else if(urlObj.pathname=="/userReg"){

        }else{
            //设置一些响应头信息
            res.writeHead("606","Bad Request...",{"Content-Type":"text/html;charset=utf-8"});
            res.setHeader(name,value);res.setHeader("Content-Type","text/html;charset=utf-8");
        }


//var urls=req.url;
        //urls=urls.replace("/?","");
        //var obj=querystring.parse(urls);
        ////console.info(obj);
        //console.info("用户名:"+obj.uname);
        //console.info("密码:"+obj.pwd);
        //res.end();
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
    console.info("服务器被关闭");
})

server.on("error",function(err){
    console.info(err);
    if(err.code=="EADDRINUSE"){
        console.info("端口被占用。。");
    }
});

