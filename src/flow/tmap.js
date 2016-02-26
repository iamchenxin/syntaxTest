/* @flow */

type tmtype = Map<string|number,string>;
function log(v){
  console.log(v);
}
function  ts2(){
  var tm:tmtype = new Map();
  tm.set(1,"222");
  tm.set('1',"hahah");
  function ilog(k){
    log(tm.get(k));
  }

  ilog(1);
  ilog("1");
}



ts2();