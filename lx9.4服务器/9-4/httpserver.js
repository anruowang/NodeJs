/**
 * Created by Administrator on 2016/9/4.
 */
var http=require("http");

//var options={//http:www.baidu.com:80/index.html
//    host:"www.baidu.com",
//    post:80,
//    path:"/index.html",
//    method:"GET"
//}

var options={
    host:"127.0.0.1",
    port:6868,
    path:"/",
    method:"POST"
}

var req=http.request(options,function(res){
//var req=http.request("http://www.hao123.com",function(res){
    console.info(res.statusCode);//获取响应码
    console.info(JSON.stringify(res.headers));
    res.on("data",function(data){
        console.info(data.toString());
    });
});
req.write("你好啊");
req.on("error",function(err){
    console.info(err);
})

req.end();
