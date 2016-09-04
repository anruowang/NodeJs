///**
// * Created by Administrator on 2016/8/29.
// */
////outter:for(var i=1;i<10;i++){
////    for(var j=1;j<5;j++){
////        if(i*j==15){
////            break outter;
////        }
////        console.info(i+" "+j);
////    }
////    console.info(i+"...");
////}
//
//var req = {
//    session: {
//        user: {
//            uname: "navy",
//            age: "20",
//        }
//    }
//}
//console.info(req.session.user.uname);
//console.info(req.session.user.age);
//
//for (var attr in req.session.user) {
//    console.info(attr + ":" + req.session.user[attr]);
//}
//with (req.session.user) {
//    console.info(uname + " " + age);
//}


//var yc=require("./yc");
//var yc=require("./yc.js");
//console.info(yc.test);
//console.info(yc.txt);//undefined
//console.info(yc.info);

var yc1=require("./yc");
var yc1=require("./yc");//不会输出两次，有缓存

//这样才会输出两次
yc1.output();
yc1.output();