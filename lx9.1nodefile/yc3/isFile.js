/**
 * Created by Administrator on 2016/9/1.
 */
var fs=require("fs");
fs.stat("./",function(err,stats){
    console.info(stats.isFile());//判断是否是一个文件
    console.info(stats.isDirectory());//判断是否是一个目录
})