/**
 * Created by Administrator on 2016/8/31.
 */
var StringDecoder=require("string_decoder").StringDecoder;
var str="源辰信息科技有限公司";
var buf=new Buffer(str);
console.info(buf);//总共占30个字节

var decoder=new StringDecoder();//new StringDecoder([decoding]);
console.info(decoder.write(buf));

//我们将str存到两个BUffer对象中，第一个存放10,第二个存放20
var buf1=new Buffer([0xe6,0xba,0x90,0xe8,0xbe,0xb0,0xe4,0xbf,0xa1,0xe6,0x81]);
var buf2=new Buffer([0xaf,0xe7,0xa7,0x91,0xe6,0x8a,0x80,0xe6,0x9c,0x89,0xe9,0x99,0x90,0xe5,0x85,0xac,0xe5,0x8f,0xb8]);
console.info(buf1.toString()+buf2.toString());

//将两个buffer对象合并到一起
var str3=Buffer.concat([buf1,buf2]);
console.info(str3.toString());

//此时我们可以直接使用StringDecoder对象中的write方法输出
console.info(decoder.write(buf1));
console.info(decoder.write(buf2));