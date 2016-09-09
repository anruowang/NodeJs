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
       // connection.query({sql:"select * from classInfo c,stuInfo s where c.cid=s.cid",nestTables:"_"},

         //分页查询 limit n,m  n:从第几条记录开始显示  m:显示几条
        // 查询第一页，每页两条 limit 0,2  查询第二页，每页两条记录  limit 1,2 查询第三页，每页两条  limit 4,2
        //查询第n页，每页m条  limit (n-1)m,m
         connection.query("select * from classInfo order by cid limit 0,2", function(err,result){
                //console.info(result);
                result.forEach(function(row){
                    var str="";
                    for(var attr in row){
                        str+=row[attr]+"\t";
                    }
                    console.info(str);
                });
             connection.release();//将连接还给数据库连接池

             pool.end();//关闭连接池
            });
    }
});