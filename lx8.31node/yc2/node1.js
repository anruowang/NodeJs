/**
 * Created by Administrator on 2016/8/31.
 */
//var buf1=new Buffer("源辰信息科技有限公司");
//console.info(buf1);
////将buffer对象中保存的数据转化为一个json格式的字符串
//var json=JSON.stringify(buf1);
//var jsonObj=JSON.parse(json);//将json类型的字符串转为json对象
//console.info(json);
//console.info(jsonObj.data);//这个时候就可以通过对象名，属性名取值
//
////将字符串对象转为一个buffer对象
//var str=new Buffer(JSON.parse(json));
//console.info(str);
//console.info(str.toString());


var buf=new Buffer("源辰信息有限公司");
var copyBuf=new Buffer(40);
//第一个参数是将源数据复制到新的对象
//第二个参数是从新对象的哪个位置开始存放复制过来的数据
//第三个参数是从源数据开始复制
//第四个参数是从源数据中复制的长度，默认是源数据的长度
buf.copy(copyBuf,0,0,12);
console.info(copyBuf.toString());

//Buffer对象的常用方法
//toString();将Buffer对象中的数据，以字符串的方式输出
//isBuffer():判断是否是一个buffer对象
console.info(Buffer.isBuffer(buf));//true
var str="哈哈";
console.info(Buffer.isBuffer(str));//false instanceof

//byteLength();//计算一个字符串的字节数
console.info(Buffer.byteLength(str,"utf8"));//6
console.info(Buffer.byteLength(str,"utf16le"));//4

//concat();//拼接多个buffer对象中的指

//isEncoding();检查是否有一个有效的编码
console.info(Buffer.isEncoding("utf8"));//true
console.info(Buffer.isEncoding("GBK"));//false

//Length
console.info(copyBuf.length);//注意这是一个属性，而不是方法 40

//toJSON()转为json对象
var json=buf.toJSON();
console.info(json.type);//Buffer


//buf1.equals(buf2);判断两个buffer对象是否相等，如果相等则返回true,否则返回false
//buf1.compare(but2);//比较两个buffer对象，但返回的是一个数字

//buf.slice([start],[end]);//截取buffer对象中的一截
//buf.fill(value,[offset],[end]);//填空