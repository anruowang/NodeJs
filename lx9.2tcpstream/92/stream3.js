/**
 * Created by Administrator on 2016/9/2.
 */
var fs=require("fs");
var file=fs.createReadStream("./hsq.jpg");//流的方式读取文件
var out=fs.createWriteStream("./20.jpg");//流的方式写文件
//////////////////////复制图片hsq.jpg为20.jpg

file.on("open",function(fd){
    console.info("文件被打开了。。。");
})

file.on("data",function(data){
    console.info("读取数据:"+data);
    //将读到的数据写入到message.txt文件中
    out.write(data,function(){
        console.info(data.toString());
        //out.end();
    });
});

file.on("end",function(){
    console.info("文件已经完成写入。。。");
    out.end();//位置问题1
});

file.on("close",function(){
    console.info("文件被关闭...");
});

file.on("error",function(err){
    console.info(err);
});

