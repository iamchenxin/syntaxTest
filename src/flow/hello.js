/* @flow */
function foo(str:string,x:number):string{
    if(str.length>x){
        return `length > ${x}`;
    }else{
        return ` < ${x}`;
    }
}

var a =foo("how are you",5);
console.log(a);