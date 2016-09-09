/**
 * Created by Administrator on 2016/9/7.
 */
var mysql=require("mysql");

var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"stusys",
    user:"root",
    password:"1",
    connectionLimit:20,
    queueLimit:10
});

pool.getConnection(function(err,connection){
    if(err){
        console.info("获取数据库连接失败"+err);
    }else{
        //查询每个班级的学生信息

        //左外连接：以left join左边的表为基表，基表中所有的数据都显示，非基本表没有的用null表示 补空  right join：右连接 inner join:内连接  full join:完全外连接
        connection.query({sql:"select * from classInfo c,stuInfo s where c.cid=s.cid",nestTables:"_"},
            function(err,result){
                //console.info(result);
                result.forEach(function(row){
                    var str="";
                    for(var attr in row){
                        str+=row[attr]+"\t";
                    }
                    console.info(str);
                });
            });
    }
});