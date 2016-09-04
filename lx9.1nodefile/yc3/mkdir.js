///**
// * Created by Administrator on 2016/9/1.
// */
var fs=require("fs");
//异步方式创建目录
//fs.mkdir("./test",function(err){
//    if(err){
//        console.info("目录创建失败");
//    }else{
//        console.info("目录创建成功");
//    }
//})
//
//fs.mkdir("./temp");//同步方式创建目录

//可以通过fs.readdir(path,callback)来读取目录
//fs.readdir("./",function(err,files){
//    if(err){
//        console.info("读取目录失败");
//    }else{
//        console.info(files);//files指定目录下所有文件或目录
//    }
//})
//
//var fls=fs.readdirSync("./");
//console.info(fls);

//查看文件或目录信息  fs.stat(path,callback)
//fs.stat("./yc.txt",function(err,stats){
//    if(err){
//        console.info("出错啦");
//    }else{
//        console.info(stats.size);
//    }
//})

//获取指定文件夹的大小
fs.stat("./",function(err,stats){
    if(err){
        console.info("出错啦");
    }else{
        console.info(stats.size);

    }
})

////fs.exists(path,callback);
//fs.exists("./yc.txt",function(exists){
//    console.info(exists);
//})//true
//
////fs.realpath(path,{cache},callback);//获取文件或目录的绝对路径
//
////cache:一个对象，其中存放一些预先指定的路径
//var cache={"/abc":"./yc"};
//fs.realpath("/abc/yc.js",function(err,path){
//    if(!err){
//        console.info(path);//输出指定文件的绝对路径
//    }else{
//        console.info(err);
//    }
//})

