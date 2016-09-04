/**
 * Created by Administrator on 2016/9/1.
 */
//指定位置读写文件
//fs.open(filename,flags,[,mode],callback);
var fs=require("fs");

//fs.read(fd,buffer,offset,length,position,callback);
//fd:必须为open方法所使用的回调函数中返回的文件描述或openSync方法返回的文件描述符
//buffer:为一个Buffer对象，用于指定将文件数据读取到那个缓存区
//offset:指定向缓冲区中写入文件的开始位置
//length:指定从文件中读取的字节数
//position:指定读取文件时的开始位置
//callback:function(err,bytesRead,buffer){}

//fs.open()
//第二参数flag是指定以什么方式打开，r:读的方式  w:写的方式   a:追加的方式
//函数回调中，fd就是打开这个文件的一个引用

fs.open("./yc.txt","r",function(err,fd){
    if(err){
        console.info("以读的方式打开文件失败。。。");
    }else {
        var buffer = new Buffer(255);

        //fs.read(fd,buffer,0,12,27,function(err,len,bf){
        //    console.info(buffer.toString());
        //    console.info(len);
        //    console.info(bf.slice(0,len).toString());
        //});

        fs.read(fd, buffer, 0, 12, 0, function(err, len, bf){
            //position参数值用于指定读取文件时的开始位置（以字节为单位），如果该参数为null
            //将从文件的当前被读取的位置处（前一次读取时的开始位置+读取的字节数）开始读取文件
            console.info(bf.slice(0, len).toString());
            fs.read(fd,buffer,12,12,null, function (err, len1, bf1) {
                console.info(buffer.toString());
                //console.info(bf1.slice(12, len1).toString());
                console.info(bf1.slice(12, 24).toString());
            });

        });
    }
});

var fd=fs.openSync("./yc.txt","r");
var buf=new Buffer(100);
var len=fs.readSync(fd,buf,0,12);
console.info(buf.slice(0,len).toString());
Len=fs.readSync(fd,buf,12,12,null);
console.info(buf.slice(0,24).toString());


//var buf=new Buffer("哈哈，呵呵");
//fs.open("./yc.txt","a",function(err,fd){
//    if(err){
//        console.info("打开文件失败");
//    }else{
//       fs.write(fd,buf,0,buf.length,12,function(err,writeLen,buffer){
//           if(err){
//               console.info("写入文件失败...");
//           }else{
//               console.info(writeLen);
//               console.info(buffer.toString());
//           }
//       }) ;
//    }
//
//});

var buf=new Buffer("哈哈，呵呵");
fs.open("./yc.txt","a",function(err,fd){
    if(err){
        console.info("打开文件失败");
    }else{
        fs.write(fd,buf,0,6,0,function(err,writeLen,buffer){
            if(err){
                console.info("写入文件失败...");
            }else{
                fs.write(fd,buf,6,12,null,function(err,len,buffer){
                if(err){
                    console.info("写入文件失败");
                }else{
                    console.info("文件写入完成");
                }
                })
            }
        });
    }
    fs.fsync(fd);//fs.fsyncsync(fd)同步;//刷新缓存
    fs.close(fd);//fs.closeSync(fd);//关闭打开文件
});


