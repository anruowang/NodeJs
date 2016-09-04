/**
 * Created by Administrator on 2016/8/31.
 */
var fs=require("fs");
//第一个要写入的参数是要写入文件的路径和名称
//第二个 参数是要写入的数据
//第三个参数是写入数据时的一些参数信息，这一项可选
//    options参数的一个对象
//        flag属性：用于指定用什么方式操作，默认是w
//        mode属性：用于指定文件被打开的读写权限，默认是0666(可读写)
//                        使用4个数据表示mode属性的值，其中第一个数字必须是0
//                        第二个文件或目录所有者的权限
//                        第三个是指定文件或目录所有者所属组的其他成员权限
//                第四个是指定跟文件或目录所有者不再同一个组的其他用户权限
//        0：可执行 001 2：写权限 010 4:读权限 100
//第四个参数是一个回调函数

//异步
//fs.writeFile("./yc.txt","源辰信息","utf8",function(err){
//    if(err){
//        console.error("写入文件失败");
//    }else{
//        console.info("写入数据完成");
//    }
//});
//
//
////异步
//fs.readFile("./yc.txt","utf8",function(err,data){
//    if(err){
//        console.error("出错啦。。。");
//    }else{
//        console.info(data);
//    }
//});
//console.info("结束");
//
////同步方式
//var data=fs.readFileSync("./bf.js","utf8");
//console.info(data);

//异步
fs.appendFile("./yc.txt","\r\n这是后面添加的数据",{encoding:"utf8"},function(err){
    if(err){
        console.error("出错啦。。。");
    }else{
        console.info("文件追加完成");
        console.info(fs.readFileSync("./yc.txt").toString());
    }
})

//同步
fs.appendFileSync("./yc.txt","\r\n这是以同步方式追加的数据。。");

