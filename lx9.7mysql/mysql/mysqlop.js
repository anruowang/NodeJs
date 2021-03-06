/**
 * Created by Administrator on 2016/9/5.
 */
var connection=require("./connection").conn;//获取数据库的连接

connection.connect(function(err){
    if(err){
        console.info("数据库连接失败");
    }else {
        insertData();//如果连接成功，则添加数据
    }
})
function insertData(){
    //一次性添加多条数据
    var sqlStr="";
    for(var i=1;i<=4;i++){
        sqlStr+="insert into stuinfo values(0,'花花_"+ i+ "',1002,'女',"+ (20+i) + ",'aaa','1509609888"+ i+ "');";
    }
    console.info(sqlStr);
    connection.query(sqlStr,function(err,result){
        if(err){
            console.info("学生信息添加失败");
            connection.end();
        }else{
            updateData();//如果成功，则更新数据
        }
    });
}

function updateData(){
    connection.query("update stuinfo set sname=? where sid=?",['盼盼',10003],function(err,result){
        if(err){
            console.info("学生信息更新失败");
            connection.end();
        }else{
            delData();//如果成功，则删除
        }
    });
}

function delData(){
    connection.query("delete from stuinfo where sid>=?",[10005],function(err,result){
        if(err){
            console.info("学生信息删除失败");
            connection.end();
        }else{
            findData();//如果成功，则删除
        }
    });
}


function findData(){
    connection.query("select * from stuinfo",function(err,result){
        if(err){
            console.info("学生信息查询失败");
            connection.end();
        }else{
            console.info(result);//如果成功，则删除
            connection.end();
        }
    });
}