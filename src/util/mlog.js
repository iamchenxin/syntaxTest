const util = require('util');

export default function mlog(txt){
  const v = util.inspect(txt,true,3,true);
  console.log(v);
}