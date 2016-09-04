/**
 * Created by Administrator on 2016/9/2.
 */
var net=require("net");
var fs=require("fs");
var file=fs.createWriteStream("./message.txt");
var server=net.createServer(function(socket){
   socket.setEncoding("utf8");
    socket.on("data",function(data){
        //当客户端有数据发送进来时，就会触发这个事件
        //讲接收到的数据全部存到一个文件中
        console.info(data.toString());
    });

});

//当端口设置为0时，有系统自动随机分配一个端口
server.listen(0,function(){
    console.info("服务器开始启动，监听的端口为： %j",server.address());
})