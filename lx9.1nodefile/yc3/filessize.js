/**
 * Created by Administrator on 2016/9/1.
 */
var fs=require("fs");
var total=0;

function getSize(path){
    var stats=fs.statSync(path);
    if(stats.isDirectory()){//是一个目录的话
        //获取当前目录下的所有文件或子目录
        var files=fs.readdirSync(path);
        for(var i=0;i<files.length;i++){
            getSize(path+"/"+files[i]);//yc/index.js
        }
    }else if(stats.isFile()){//是一个文件的话
       total+=stats.size;
    }

}

getSize("./");

console.info("总大小："+total);