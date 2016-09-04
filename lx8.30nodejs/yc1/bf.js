/**
 * Created by Administrator on 2016/8/30.
 */
var buf=new Buffer(10);
buf.fill(10);//用10去填充buf对象
console.info(buf.length);//10
console.info(buf);//所有的值都是16进制表示的

//创建指定值的buffer
var buf1=new Buffer([10,20,30,40,50]);
console.info(buf1.length);//5
console.info(buf1);

//通过一个字符串来创建buffer对象，将自动执行字符串的输入和输出时的编码和解码处理
//默认是utf的，支持编码：ascii utf-8 utf16le base64 hex ucs2 binary(不推荐使用)
var buf2=new Buffer("ycinfo","utf-8");
console.info(buf2.length);//6
console.info(buf2);

var str="源辰信息科技有限公司";
var buf3=new Buffer(str);
console.info(str.length);//10
console.info(buf3.length);//30 一个utf8字符占用3个字节

//可以通过索引下标访问字符串对象或缓存区中的数据，但是，在截取数据中，字符串对象也是以文字作为一个单位的，而缓存区对象以字节为一个单位的
console.info(str[2]);//信
console.info(buf3[2]);//144

//注意：字符串对象一旦创建，将不能修改
str[1]=["晨"];
console.info(str);//并没有修改
//而buffer对象是可以被修改的，可以通过序号来修改其中某个字节处的数据

console.info(buf3[3]);
console.info(buf3[4]);
console.info(buf3[5]);

buf3[0]=232;
buf3[1]=190;
buf3[2]=176;

console.info(buf3.toString());