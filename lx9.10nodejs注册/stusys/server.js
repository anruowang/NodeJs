/**
 * Created by Administrator on 2016/9/7.
 */
var http=require("http");
var mysql=require("mysql");
var querystring=require("querystring");
var fs=require("fs");
var url=require("url");

var server=http.createServer().listen(8888,function(){
    console.info("服务已经启动。。。");
});

var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"stusys",
    user:"root",
    password:"1",
    connectionLimit:20,
    queueLimit:10
});

server.on("request",function(req,res){
    if(req.url!="/favicon.ico"){
        var urlobj=url.parse(req.url);//将url变成json对象
        var path=urlobj.pathname;
        if(path=="/"){
            readFile("./login.html",res);
        }else if(path=="/getAllClassInfo"){//获取所有班级信息
            pool.getConnection(function(err,connection){
                if(err){
                  res.writeHeader(200,"OK",{"Content-Type":"text/html"});
                   res.write("{code:0}");//如果获取连接失败，返回一个0
                    res.end();
                }else{
                   connection.query("select *  from classInfo order by cid asc",function(err,rows){
                       if(err){
                          res.write("{code:1}");
                           res.end();
                       }else{
                           //res.write(rows.toString());
                           res.write(JSON.stringify(rows));
                           res.end();
                       }
                   });
                }
            });
        }else if(path=="/adduser"){//说明是学生注册
            //注意此时我们使用的是POSt提交方式，数据不再url里面，所以不能直接从url中获取
            //POST提交数据时，请求头信息和数据是分开传送的，先发送请求头信息，然后发送数据，所以我们需要监听来完成数据接收
            //获取学生注册信息
            req.on("data",function(data){
                var dataInfo=querystring.parse(data.toString());
                dataInfo["sid"]=0;

                //将用户提交的注册信息存入数据库
                pool.getConnection(function(err,connection){
                    if(err){//数据添加失败则返回一个0
                        res.write("0");
                        res.end();
                    }else{
                        console.info(dataInfo);
                        connection.query("insert into stuinfo set ?",dataInfo,function(err,result){
                            if(err){
                                res.write("1");//数据添加失败
                            }else{
                                res.write(result.insertId+"");
                            }
                            res.end();
                        });
                    }
                })
            });
        }else{
            readFile("."+path,res);
        }
    }else{
        res.end();
    }
});

//读取指定路径下的文件
function readFile(path,res){
    //先判断文件是否存在
   fs.exists(path,function(exists){
       if(exists){
           var file=fs.createReadStream(path);
           file.on("data",function(data){
               res.write(data);
           });

           file.on("end",function(){
               res.end();
           });
       }else{
           res.writeHeader(404,"Not Found",{"Content-Type":"text/html;charset=utf-8"});
           res.write("<h1>404页面未找到</h1>");
           res.end();
       }
   })
    //如果是fileRead读文件的话，必须判断要读取的文件类型
    //fs.readFile(path,"binary",function(err,data){});
    //fs,readFile(path,"utf8",function(err,data){});
}