/**
 * Created by Administrator on 2016/9/2.
 */
var net=require("net");
var server=net.createServer(function(socket){
    server.getConnections(function(err,count){
        console.info("当前有 %d 个人在线...",count);

        server.maxConnections=2;//设置最大的连接数

        console.info("当前tcp服务器允许的最大连接数为： %d",server.maxConnections);

        if(count==2){
            console.info("服务器正在被关闭...");
            server.close(function(){
                //注意，此时服务器并不一定会立马关闭，只是会拒绝新的连接，当所有的连接都断开后，才会被关闭
                console.info("tcp服务器已经关闭...");
            })
        }
    })

});

//当端口设置为0时，有系统自动随机分配一个端口
server.listen(0,function(){
    console.info("服务器开始启动，监听的端口为： %j",server.address());
})