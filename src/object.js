import mlog from './util/mlog';

function ts(){
  var v1 = '123';
  var v2 = true;
  var v3 = 10;
  var v4 = Symbol('foo')
  var v5 = 'iamjim';

  var obj = Object.assign({}, v1, null, v2, undefined, v3, v4,v5); 
  // Primitives will be wrapped, null and undefined will be ignored.
  // Note, only string wrappers can have own enumerable properties.
  //console.log(obj); // { "0": "1", "1": "2", "2": "3" }
  mlog(obj);
}

ts();