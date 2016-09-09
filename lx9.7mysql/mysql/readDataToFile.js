/**
 * Created by Administrator on 2016/9/7.
 */
var mysql=require("mysql");
var fs=require("fs");

var connection=mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    database:"stusys",
    user:"root",
    password:"1"
});

//var out=fs.createWriteStream("./data.xsl");//不支持，excel支持gbk编码，nodejs不支持gbk
var out=fs.createWriteStream("./data.txt");//数据写出流,我们将读到的数据写出到当前目录的data.txt文件中

out.on("error",function(err){
    console.info("数据写入文件失败...."+err);
    process.exit();//退出程序
});

connection.connect(function(err){
    if(err){
        console.info("连接数据库失败..."+err);
    }else{
        var result=connection.query({sql:"select * from stuInfo s inner join classInfo c on s.cid=c.cid",nestTables:"_"});
        result.on("error",function(err){
            console.info("获取学生信息失败。。。。"+err);
            process.exit();//退出程序
        });

        result.on("fields",function(fields){
            //读取每一行每一列的数据  fields是存放所有列的值
            var str="";
            fields.forEach(function(field){//循环所有的列
                str+=field.name+"\t";
            });
            out.write(str+"\r\n");
           // console.info("fields:"+fields);
        });

       result.on("result",function(row){//每读取一行记录，触发一次
           connection.pause();//每读到一条数据，先暂停读取后面的数据
           out.write(row.s_sid+"\t"+row.s_sname+"\t"+row.s_cid+"\t"+row.s_sex+"\t"+row.s_age+"\t"
               +row.s_pwd+"\t"+row.s_tel+"\t"+row.c_cid+"\t"+row.c_cname+"\t"+row.c_status+"\r\n",
               "utf8",function(err){
               if(err){
                   console.info("数据写入文件失败。。。。"+err);
                   process.exit();//退出程序
               }else{
                   //如果没有错误，则继续读取下一行数据
                   connection.resume();
               }
           });
       });

        result.on("end",function(){
            console.info("学生信息读取完毕");
            connection.end();//关闭连接
        });
    }
});