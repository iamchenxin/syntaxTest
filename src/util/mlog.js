import util from 'util';

export default function mlog(txt){
  util.inspect(txt,true,3,true);
//    console.log(txt);
}