/**
 * Created by lenovo on 2016/9/22.
 */
var express=require("express");//创建服务器
var cookieparser=require("cookie-parser");//cookie
var session=require("express-session");//session
var mysql=require("mysql");//操作数据库
var fs=require("fs");//操作文件或目录
var bodyparser=require("body-parser");//处理请求的
var multer=require("multer");//处理文件上传的
var log4js=require("log4js");//日志

var app=express();//创建一个应用程序

//配置和使用body-parser中间件
app.use(bodyparser.urlencoded({extended:false}));

//配置和使用session中间件
app.use(session({
    secret:'keyboard cat',//
    resave:true,//
    saveUnintialized:true,//
    cookie:{secure:false,maxAge:1000*60*20}//
}));

var fileUploadPath="/page/pic";//存入服务器的路径
var fileUploadPathData="/pic";//存入数据库中路径，主要除掉static中的路径

//配置文件上传的中间件
var upload=multer({dest:"."+fileUploadPath});//上传文件的目录设置


//配置数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    post:3306,
    database:"goods",
    user:"root",
    password:"1"
});


//监听所有类型的请求,注意此时要将静态中间件放到这个的后面，否则当我们访问静态资源时，不会被这个监听拦截
app.all("/back/*",function(req,res,next){//back/goods.html
    if(req.session.currentLoginUser==undefined){
        res.send("<script>alert('请先登录。。。');location.href='/index.html';</script>");
    }else{//说明已经登录
        next();//将请求往下传递给对应的处理方法
    }
});

//处理用户注册的方法
app.post("/userRegister",function(req,res){
    var result="0";
    if(req.body.uname==""){
        res.send("1");//说明用户名为空
    }else if(req.body.pwd==""){
        res.send("2");//说明密码为空
    }else if(req.body.pwd!=req.body.pwdagain){
        res.send("3");//说明两次密码不一致
    }else {
        pool.getConnection(function(err,connection){
            if(err){
                res.send("4");//说明数据库连接失败
            }else {
                connection.query("insert into adminInfo values(0,?,?)",[req.body.uname,req.body.pwd],function(err,result){
                    connection.release();//释放连接给连接池
                    if(err){
                        res.send("5");//说明添加数据失败
                    }else {
                        res.send("6");//注册成功
                    }
                });
            }
        });
    }
});

app.post("/userLogin",function(req,res){//处理用户登录的请求
    if(req.body.uname==""){
        res.send("1");
    }else if(req.body.pwd==""){
        res.send("2");
    }else{
        pool.getConnection(function(err,conn){
           if(err){
             res.send("3");
             }else{
               conn.query("select aid,aname,pwd from adminInfo where aname=? and pwd=?",[req.body.uname,req.body.pwd],function(err,result){
                   if(err){
                       res.send("4");
                   }else{
                       if(result.length>0){//说明用户登录成功，则需将当前用户信息存到session中
                           req.session.currentLoginUser=result[0];
                           res.send("6");
                       }else{
                           res.send("5");
                       }
                   }
               });
           }
        });
    }
});

app.get("/checkUserName",function(req,res){//检查用户名是否可用
    if(req.query.uname==""){
        res.send("1");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("1");
            }else{
                //参数占位符用1个？ 非参数占位符用两个??
                conn.query("select * from ?? where ??=?",[req.query.tabname,req.query.colName,req.query.uname],function(err,result){
                    if(err){
                        logger.info(err.message.toString());
                        res.send("1");
                    }else{
                        if(result.length>0){//说明找到了数据
                            res.send("1");
                        }else{
                            res.send("0");
                        }
                    }
                })
            }
        })
    }
});

app.get("/userIsLogin",function(req,res){//处理用户是否已经登录的请求
    if(req.session.currentLoginUser==undefined){
        res.send("0");
    }else{
        res.send(req.session.currentLoginUser.aname);
    }
});

app.get("/getAllTypes",function(req,res){//处理获取所有商品类型的请求
    pool.getConnection(function(err,conn){
        res.header("Content-Type","application/json");
        if(err){
            res.send('{"err":"0"}');
        }else{
            conn.query("select tid,tname,status from goodstype where status=1",function(err,result){
                conn.release();
                if(err){
                    res.send('{"err","0"}');
                }else{
                    console.info(result);
                    res.send(result);
                }
            });
        }
    });
});

app.post("/addGoodsType",function(req,res){//添加商品类型
    console.info(req.body.tname);
    if(req.body.tname==""){

        res.send("0");


    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("0");
                console.info(err);

            }else {
                conn.query("insert into goodsType values(0,?,1)", [req.body.tname], function (err, result) {
                    conn.release();
                    if (err) {
                        console.info(err);
                        res.send("0");
                    } else {
                        res.send(result.insertId+"");
                    }
                });
            }
        });
    }
});

app.post("/delGoodsType",function(req,res){
    if(req.body.tid==""){
        res.send("0");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("2");
            }else{
                conn.query("update goodsType set status=0 where tid=?",[req.body.tid],function(err,result){
                    conn.release();
                    if(err){
                        res.send("3");
                    }else{
                        res.send("1");
                    }
                });
            }
        });
    }
});

app.post("/addGoods",upload.array("pic"),function(req,res){//处理获取所有商品信息的请求
    console.info(req.body.tid);
    if(req.body.tid==""||req.body.pname==""||req.body.price==""){
        res.send("0");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("2");
            }else{
                var fileName="";
                var filePath="";
                var file;
                if(req.files!=undefined){
                    for(var i in req.files){
                        file=req.files[i];
                        fileName=new Date().getTime()+"_"+file.originalname;
                        file.renameSync(file.path,__dirname+fileUploadPath+"/"+fileName);
                        if(filePath!=""){
                            filePath+=",";
                        }
                        filePath+=fileUploadPathData+"/"+fileName;//1.jpg,2.jpg
                    }
                }
                conn.query("insert into goodsInfo values(0,?,?,?,?)",
                    [req.body.pname,req.body.price,filePath,req.body.tid],function(err,result){
                        conn.release();
                        if(err){
                            console.info(err);
                            res.send("3");
                        }else{
                            res.send("1");
                        }
                    });
            }
        });
    }
});

app.post("/getAllGoodsInfo",function(req,res){//获取所有商品信息
    pool.getConnection(function(err,conn){
        res.header("Cotent-Type","application/json");
        if(err){
            res.send('{"err":"0"}');
        }else{
            conn.query("select g.*,tname from goodsInfo g,goodstype t" +
                " where g.tid=t.tid",function(err,result){
                conn.release();
                if(err){
                    res.send('{"err":"0"}');
                }else{
                    res.send(result);
                }
            });
        }
    });
})

app.post("/getGoodsInfoByPage",function(req,res){//处理前台的分页请求
    var pageNo=req.body.pageNo;
    var pageSize=req.body.pageSize;
    if(pageNo<0){
        pageNo=1;
    }
    if(pageSize<0){
        pageSize=7;
    }
    pool.getConnection(function(err,conn){
        res.header("Content-Type","application/json");
        if(err){
            res.send('{"err":"0"}');
        }else{//1-7 0-7 2-7 3-7 14-7  (pageNo-1)*pageSize
            conn.query("select g.*,tname from goodsInfo g,goodstype t" +
                " where g.tid=t.tid limit "+(pageNo-1)*pageSize+","+pageSize,function(err,result){
                conn.release();
                if(err){
                    console.info(err);
                    res.send('{"err":"0"}');
                }else{
                    res.send(result);
                }
            });
        }
    });
})

app.post("/getGoodsInfoByPageOne",function(req,res){//处理前台的第一次分页请求
    var pageNo=req.body.pageNo;
    var pageSize=req.body.pageSize;
    if(pageNo<0){
        pageNo=1;
    }
    if(pageSize<0){
        pageSize=7;
    }
    pool.getConnection(function(err,conn){
        res.header("Cotent-Type","application/json");
        if(err){
            res.send('{"err":"0"}');
        }else{//1-7 0-7 2-7 3-7 14-7  (pageNo-1)*pageSize
            conn.query("select g.*,tname from goodsInfo g,goodstype t" +
                " where g.tid=t.tid limit "+(pageNo-1)*pageSize+","+pageSize,function(err,result){
                conn.release();
                if(err){
                    console.info(err);
                    res.send('{"err":"0"}');
                }else{
                    var obj={objs:result};
                    conn.query("select count(gid) as total from goodsInfo",function(err,result){
                        //conn.release();
                        var total=0;
                        if(err){
                            total=0;
                        }else{
                            total=result[0].total;
                        }
                        obj.total=total;//{objs:[],total:9}
                        res.send(obj);
                    });
                }
            });
        }
    });
})

//使用静态中间件
app.use(express.static("page"));//默认到page文件夹下查找静态资源

app.listen(8888,function(err){
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功。。。");
    }
});