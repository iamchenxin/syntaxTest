function ts(args,callback){
  function inner(arg,fn){
    fn(arg);
  }
  inner(args,callback);
}
var util=require('util');

function mylog(v){
  console.log(util.inspect(v,true,3,true));
}

function ts2(v){
  ts(v,mylog);
}

function ts3(){
  ts2({a:[1,2,3],b:"hehe"});
}

ts3();