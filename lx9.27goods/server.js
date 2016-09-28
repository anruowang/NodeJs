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

var app=express();//创建一个应用程序


//配置和使用bodyparser
app.use(bodyparser.urlencoded({extended:false}));




//配置和使用session中间件
app.use(session({
    secret:'keyboard cat',//
    resave:true,//
    saveUnintialized:true,//
    cookie:{secure:false,maxAge:1000*60*20}//
}));


var fileUploadPath="/page/pic";

//配置文件上传的中间件
var upload=multer({dest:"."+fileUploadPath});//上传文件的目录设置


//
var pool=mysql.createPool({
    host:"127.0.0.1",
    post:3306,
    database:"goods",
    user:"root",
    password:"1"
});


//监听所有类型的请求
app.all("/back/*",function(err,res,next){
    if(req.session.currentLoginUser==undefined){
        res.send("<script>alert('请先登录。。。');location.href='/index.html';</script>");
    }else{
        next();//将请求往下传递给对应的处理方法
    }
});

//处理用户注册的方法
app.post("/userRegister",function(req,res){
    var result="0";
    if(req.body.uname==""){
        res.send("1");//说明用户名为空
    }else if(req.body.pwd==""){
        res.send("2");//
    }else if(req.body.pwd!=req.body.pwdagain){
        res.send("3");//
    }else {//
        pool.getConnection(function(err,connection){
            if(err){
                res.send("4");//
            }else {
                connection.query("insert into adminInfo values(0,?,?)",[req.body.uname,req.body.pwd],function(err){
                    if(err){
                        res.send("5");
                    }else {
                        res.send("6");
                    }
                })
            }
        })
    }
});

app.post("/userLogin",function(req,res){
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
                       if(result.length>0){
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

app.get("/checkUserName",function(req,res){
    if(req.query.uname==""){
        res.send("1");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("1");
            }else{
                conn.query("select aid from adminInfo where aname=?",[req.query.uname],function(err,result){
                    if(err){
                        res.send("1");
                    }else{
                        if(result.length>0){
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

app.get("/checkUserName",function(req,res){
    if(req.query.uname==""){
        res.send("1");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("1");
            }else{
                conn.query("select * from ?? where ??=?",[req.query.tabName,req.query.colName,req.query.uname],function(err,result){
                    if(err){
                        res.send("1");
                    }else{
                        if(result.length>0){
                            rs.send("1");
                        }else{
                            res.send("0");
                        }
                    }
                })
            }
        })
    }
});

app.get("/userIsLogin",function(req,res){
    if(req.session.currentLoginUser==undefined){
        res.send("0");
    }else{
        res.send(req.session.currentLoginUser.aname);
    }
});

app.get("/getAllTypes",function(req,res){
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
                    res.send(result);
                }
            });
        }
    });
});

app.post("/addGoods",upload.array("pic"),function(req,res){
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
                        fileName=fileUploadPath+"/"+new Date().getTime()+"_"+file.originalname;
                        if(filePath!=""){
                            filePath+=",";
                        }
                        filePath+=fileName;//1.jpg,2.jpg
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

app.post("/addGoodsType",function(req,res){//添加商品类型
    if(req.body.tname==""){
        res.send("0");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("0");
            }else {
                conn.query("insert into goodsType values(0,?,1)", [req.body.tname], function (err, result) {
                    conn.release();
                    if (err) {
                        res.send("0");
                    } else {
                        res.send(result.insertID+"");
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
                conn.query("update goodsType set status where tid=?",[req.body.tid],function(err,result){
                    conn.release();
                    if(err){
                        res.send("3");
                    }else{
                        rse.send("1");
                    }
                });
            }
        });

    }
});


//使用静态中间件
app.use(express.static("page"));//默认到page文件夹下查找静态资源

app.listen(8888,function(err){
    if(err){
        console.info(err);
    }else {
        console.info("服务器启动成功。。。");
    }
});