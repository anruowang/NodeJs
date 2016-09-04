/**
 * Created by Administrator on 2016/9/2.
 */
var net=require("net");
//创建服务器
//var server=net.createServer(function(socket){
//    //socket:套接字
//    console.info("有客户端连接上来了。。。");
//    console.info(socket);
//});

//server.listen(8888); server.listen(8888,"127.0.0.1")
//server.listen(8888,function(){
//    console.info("服务器开始监听。。。");
//    var addr=server.address();//获取服务器监听的地址
//    console.info("监听的地址信息为： %j",addr);//字符串 %s  整形 %d或%i  浮点数 %f   对象%o   或%j
//});

var server=net.createServer().listen(8888);//创建并启服务器监听8888端口
//当创建服务器时，如果没有回调函数，，我们也可以在服务器才创建后，通过监听connection事件来绑定一个事件处理函数
server.on("connection",function(socket){
    console.info("有客户端连上来了。。。。");
    //获取客户端的访问地址
    console.info(socket.address().address);
});