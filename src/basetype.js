/**
 * Created by iamchenxin on 2/16/16.
 */

function stringilyObject(arg:?object):?string{
  return recurStringily(arg);

  function recurStringily(ob:any):?string{
    if(ob===null){return 'Null'};
    // must not have undefined,
//    if(ob===undefined){return 'undefined'};
    const obType = typeof ob;
    switch (obType){
      case 'number':
      case 'string':
      case 'boolean':
      case 'symbol':
        log(`obType:  ${obType} - ${ob.toString()}`);
        return ob.toString();

      case 'function':
        return '!function';//should not allow functions?

      case 'object':
        let str='';
        for(let key of Object.keys(ob).sort()){
          let v = recurStringily(ob[key]);
          str=`${str},${key}:{${v}}`;
        }
        return str;
      default:
        // should not allow the sub-value of arg has another type ?
        // should throw here?
    }

  }
}

function stringilyArg(arg: ?string|?number|?object):?string{
  const argType = typeof arg;
  switch (argType){
    case 'string':
      return arg;
    case 'number':
      return arg.toString();
    case 'object':
      return stringilyObject(arg);
    default:
      throw new Error("should not be here");
  }
}


function  log(v){
  console.log(v);
}
function ts(){

  let oo={};

  oo.tarray=[];
  oo.tob={};
  oo.tnum=1;
  oo.tnull=null;
  oo.tstring="ss";

  for(let k in oo){
    log(`${k} (${typeof oo[k]}) :${JSON.stringify(oo[k])}`);
  }

  log("--------");
  let ob = oo.tstring;
  console.dir(ob);
  let a = Object.getOwnPropertyNames(ob).sort();
  log(a);
  let b = Object.keys(ob).sort();
  log(b);


}

function tsjson(){
  let a ={
    "a":{
      aa:"heheh",
      bb:"777"
    },
    b:"ssss"
  }

  let b ={
    b:"ssss",
    c:null,
    d:true,
    e:Symbol('foo'),
    "a":{
      bb:"777",
      aa:"heheh"
    }
  }

  log(JSON.stringify(a));
  log(JSON.stringify(b));
 // log(stringilyObject(a));

  log(stringilyArg(b));
  log(stringilyArg('ssss'));
  log(stringilyArg(666));
}

tsjson();