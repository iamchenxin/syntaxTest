/**
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule stableStringifyTmp
 * @flow
 * @typechecks
 */

'use strict';
function invariant(){
    
}

function stringifyObject(arg:any):string {
  return recurStringify(arg);
}
function recurStringify(ob:any):string {
  if (ob===null) { return 'Null'; }
  // must not have undefined,
//    if(ob===undefined){return 'undefined'};
  const obType = typeof ob;
  switch (obType) {
    case 'string':
      return  ob;
    case 'number':
    case 'boolean':
    case 'symbol':
      return ob.toString();
    case 'object':
      let str='';
      for (const key of Object.keys(ob).sort()) {
        const v = recurStringify(ob[key]);
        str=`${str},${key}:{${v}}`;
      }
      return str;

    case 'function':
      // todo should not allow object have functions? throw?
      return '!function';

    default:
      invariant(false,
        'stableStringifyTmp() only allow ' +
        'string|boolean|number|object'
      );
    // should not allow the sub-value of arg has another type ?
    // should throw here?
  }
}

function getStableType(value){
  if (value===null){ 
    return 'null';
  }
  const valueType = typeof value;
  switch (valueType) 
  {
    case 'string':
    case 'number':
    case 'boolean':
    case 'symbol':
    case 'undefined':
      return valueType;
    case 'object':
      const subType = Object.prototype.toString.call(value);
      switch (subType) {
        case '[object Array]':
          return 'array';
        case '[object Object]':
          return 'object';
        case '[object Function]':
        case '[object RegExp]':
        default:
          return 'unsupported';   
      }
    default:
      return 'unsupported';    
  }
}

function orderedJSON(input: any): string {
  const type = getStableType(input);
  switch (type){
    case 'array':
      let array_strs = input.map(v=>orderedJSON(v));
      return `[${array_strs.join(',')}]`;
    case 'object':
      let keys = Object.keys(input);
      keys.sort();
      let object_strs = keys.map(key=>
        `${key}:${orderedJSON(input[key])}`
      );
      return `{${object_strs.join(',')}}`;
    case 'unsupported':
    default :
      return JSON.stringify(input);
  }
}

function stableStringify(input){
  switch (typeof input){
    case 'string':
    case 'number':
    case 'boolean':
      return input.toString();
    default :
      return orderedJSON(input);
  }
}

function stableStringifyTmp(arg: any):string {
  const argType = typeof arg;
  switch (argType) {
    case 'string':
      return arg;
    case 'number':
    case 'boolean':
      return arg.toString();
    case 'object':
      return stringifyObject(arg);
    default:
      invariant(
        false,
        'stableStringifyTmp() only allow string|boolean|number|object' +
        'but shoule not be here' +
        'the Arg is `%s`,type is `%s`',
        arg, argType
      );
  }
}



var aa={
    c:[11,"helo"],
    a:"aaa",
    b:1
};
var bb={
  caha:"流们噶",
  ah:aa,
  toBB:bb
};

var cc="hello";

function ts(v){
  console.log('----console.log----------');
  console.log(v);
  console.log('-----stableStringifyTmp------------');
  console.log(stableStringifyTmp(v));
  console.log('-----stableStringify------------');
  console.log(stableStringify(v)); 
  console.log('-----orderedJSON------------');
  console.log(orderedJSON(v)); 
  console.log('\n\n\n');
}

function getOO(v){
  return Object.prototype.toString.call(v);
}

function ts2(v){
  var t = JSON.parse(v);
  console.log(t);
}

function jsonout(v){
  console.log(JSON.stringify(v));
}

var ob = {
extra: null,
misc: true,
      top2: {
        middle: {
          inner: [1, 'foo', ['bar', 2]],
          other: false,
        },
      },
      top1: [
        {first: true},
        {first: false},
        'random',
      ],
};

var str = `{ extra:null, misc:true,top1:[{first:true},{first:false},"random"],top2:{middle:{inner:[1,"foo",["bar",2]],other:false}}}
`;

jsonout(ob);
ts2(str);

console.log(getOO(bb.toBB));

module.exports = stableStringifyTmp;