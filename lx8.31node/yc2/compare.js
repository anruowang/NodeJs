/**
 * Created by Administrator on 2016/8/31.
 */
var arr=[1,2,8,5,3,10,12,6,7,13];
arr.sort(compare);
console.info(arr);

function compare(num1,num2){
    num1=parseInt(num1);
    num2=parseInt(num2);
    if(num1<num2){
        return 1;//返回正数则说明降序排列，返回负数说明要升序排列
    }else if(num1==num2){
        return 0;
    }else{
        return -1;
    }
}