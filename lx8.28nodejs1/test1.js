/**
 * Created by Administrator on 2016/8/29.
 */
//console.info(global);
//模块：在node.js中，一个模块就是一个js文件
//引入一个模块通过关键字require("模块名")//模块名就是js文件名

//console.info(__dirname);//执行的js文件所在的绝对目录
//console.info(__filename);//执行的js文件的绝对路径
//
//console.log("this is a log");//打印日志
//console.info("this is a info");//打印信息
//console.error("this is an error");//打印错误
//console.warn("this is a warn");//打印警告
//
//console.time("test");//任意给定一个字符串，注意跟timeEnd("")中的保持保持前后一致即可
//for(var i=0;i<100;i++){
//
//}
//console.timeEnd("test");

//process存放程序中执行的一些信息
//process.stdout/process.stderr:输出信息
//process.stdin:输入信息
//process.cmd()
//process.argy:运行程序时附加在命令行的参数

//process.stdout.write("This is stdout");
//process.stderr.write("This is stderr");

process.stdout.write("请输入：")
process.stdin.setEncoding("utf-8");//设置编码集
//process.stdin.on('data',function(data){//监听用户的输入
//    console.info(data);
//})
process.stdin.on('readable',function(data){//有信息时可读取，回调函数有参数
    console.info(process.stdin.read());//读取用户输入
})