/**
 * Created by iamchenxin on 2/23/16.
 */

function toArg(){
  var args= arguments;
  return args;
}

function logar(v){
  var keys = Object.keys(v);
  console.log(`keys = ${keys},keys.length = ${keys.length}, v.length = ${v.length}`);
  console.log(v);
  console.log("\n");
}

function ts(){
  var a1=[,null,undefined,"test"];
  var arg=[,,,3];
  var a2 = toArg(...arg);
  console.log(a2[3]);
  logar(a2);
  logar(a1);
}

function ts2(){
  var a1 =[ , , , 'foo'];

  var a2 = [null, undefined, null, 'foo'];

  var a3 = [null, , null, 'foo'];

  logar(a1);
  logar(a2);
  logar(a3);
}

ts2();