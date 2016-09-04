/**
 * Created by Administrator on 2016/8/30.
 */
var http=require("http");//npm
var server=http.createServer();//创建一个http服务器
//手动触发某个事件   emitter.emit(event,[arg1],...)
server.on("ycEvent",function(arg1,arg2,arg3){
    console.info("自定义事件...");
    console.info(arg1+arg2+arg3);
})
server.emit("ycEvent",10,10,10);//自定义触发事件
server.listen(8888);

