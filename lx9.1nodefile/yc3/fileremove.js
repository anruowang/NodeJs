/**
 * Created by Administrator on 2016/9/1.
 */
var fs=require("fs");

//文件或目录的移动 fs.rename(oldpaht,newpath,callback);
//fs.rename("./test/dd.txt","./test/abc.txt",function(err){
//    if(err){
//        console.info("文件移动失败。。。");
//    }else{
//        console.info("文件移动成功。。。。");
//    }
//});//只能删空的

//文件或目录的删除 fs.rmdir(path,callback);
//fs.rmdir("./temp",function(err){
//    if(err){
//        console.info(err);
//    }else{
//        console.info("目录删除成功");
//    }
//});//只能删空的

//fs.unlink("./temp/g.js",function(err){
//    if(err){
//        console.info(err);
//    }else{
//    console.info("文件删除成功");
//    }
//})



    //var stats=fs.statSync(path);
    //if(stats.isDirectory()){//是一个目录的话
    //    //获取当前目录下的所有文件或子目录
    //    var files=fs.readdirSync(path);
    //    for(var i=0;i<files.length;i++){
    //        del(path+"/"+files[i]);//yc/index.js
    //    }
    //}else if(stats.isFile()){//是一个文件的话
    //    fs.rmdirSync(path);
    //}
//}

//del("./test");
//console.info("删除完成");

//截断文件、
fs.truncate("./za.txt",30,function(err){
    //只保留文件的前30个字节
    if(err){
        console.info(err);
    }else{
        console.info("文件截断成功");

    }
});

//监视文件fs.watchFile(file,options,listener)
//options是一个整形的数据，用来指定每隔多少毫秒监视文件是否开始改变
fs.watchFile("./za.txt",function(curr,prev){
    //current:当前   previous：前面
    console.info(curr);
    console.info(prev);

    if(Date.parse(curr.ctime)==0){
        console.info("文件被删除了...");
    }else if(Date.parse(prev.mtime)!=Date.parse(curr,mtime)){
        console.info("文件被修改了。。");
    }
})