/**
 * Created by iamchenxin on 1/16/16.
 */
function rest(){
    let str1 = 'x\uD83D\uDE80y';
    let str2 ='x\u{1F680}y';
    let str3 ='x\uD83D\uDE80y';
    let str=str3;

    console.log(str);
    let b =[...str];

    console.log(str);
    console.log(`[${str}] , [${JSON.stringify(b)}] ,(${str.length}) [${b.length}]`);
}

function log(...data){
    for (let v of data){
        console.log(v);
    }
}
function destruct(){
 //   let [a,...b]=[1,2,3,4];
   // log(a,b);
    let {c,b}={
        a:"hello",
        b:{
            bb:"222"
        },
        c:"dsdw312!"
    }
    log(c,b);
}

destruct();