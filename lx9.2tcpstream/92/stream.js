/**
 * Created by Administrator on 2016/9/2.
 */
var fs=require("fs");
var file=fs.createWriteStream("./message.txt");//流的方式写文件

file.on("open",function(fd){
    console.info("文件被打开了。。。");
})

file.on("data",function(data){
    console.info("读取数据:"+data);
});

file.on("end",function(){
    console.info("文件写入完成。。。");
});

file.on("close",function(){
    console.info("文件被关闭...");
});

file.on("error",function(err){
    console.info(err);
});