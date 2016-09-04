/**
 * Created by Administrator on 2016/8/31.
 */
var buf=new Buffer([0x10,0x20]);
console.info(buf.readUInt8(0));
console.info(buf.readUInt8(1));

buf.writeUInt8(30,0);
console.info(buf);