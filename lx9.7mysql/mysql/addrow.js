/**
 * Created by Administrator on 2016/9/5.
 */
var mysql=require("mysql");
var connection=mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    database:'stusys',
    user:'root',
    password:'1'
});

connection.connect(function(err){
    if(err){
        console.info("数据库连接失败");
    }else {
        connection.query("insert into classInfo set ?", {cid: 0, cname: 'YC26', status: 1}, function (err, result) {
            if (err) {
                console.info("班级信息添加失败");
            } else {
                console.info("班级信息添加成功");
                console.info(result);
                console.info(result.inserted);
            }
            connection.end();

        });
    }
});