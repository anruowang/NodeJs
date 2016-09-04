/**
 * Created by Administrator on 2016/8/29.
 */
var http=require('http');//引入http模块 <script src=''></script>
http.createServer(function(request,response) {//创建一个服务器
    //客户端发送给服务器端的信息被封装在request对象中，即，服务器要获取客户端的信息，必须通过request这个对象
    //服务器向客户端回送信息，通过response对象
    //console.info(request);
    //console.info(response);
    response.write("hello world");
    response.end();//响应结束
}).listener(6666,'127.0.0.1');//指定服务器监听的IP地址和端口号，如果监听所有的地址，则IP地址可以忽略

//}).listen(6666);

console.info("服务器已经启动，占用的端口号为：6666");