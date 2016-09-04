/**
 * Created by Administrator on 2016/8/31.
 */
var buf=new Buffer("源辰信息科技有限公司");
var str=buf.slice(3,6);//一个汉字三个字节
console.info(str.toString());//辰

console.info(buf.toString());

//修改通过slice()方法取出的字符
str[0]=buf[0];
str[1]=buf[1];
str[2]=buf[2];

//此时buf对象中的值也被修改了，由于Buffer对象的slice()方法并不是复制缓存区的数据，而是与该数据共享内存区域，因此
//如果修改使用slice()方法取出的数据，则该缓存区中保存的数据也会被修改
console.info(buf.toString());

//Buffer对象与字符串对象
//buf.toString([encoding],[start],[end])
console.info(buf.toString("utf8",0,12));
console.info(buf.toString("utf8",12));

//Buffer对象的write方法
//buf.write(string,[offset],[length],[encoding]);
var str="源辰信息科技有限公司";
var buf=new Buffer(str);
console.info(buf.toString());

//重写buf对象中值
buf.write("ycycyc",0,6);
console.info(buf.toString());