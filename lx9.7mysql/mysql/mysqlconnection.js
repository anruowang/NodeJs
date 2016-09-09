var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    database:'stusys',
    user:'root',
    password:'1'
});

connection.connect(function(err){
    if(err){
        console.info("mysql数据库连接失败");
    }else{
        console.info("mysql数据库连接成功");
        connection.end(function(err){
            if(err){
                console.info("mysql数据库关闭失败...");
            }else{
                console.info("mysql数据库关闭成功...");
            }
        });
    }
})