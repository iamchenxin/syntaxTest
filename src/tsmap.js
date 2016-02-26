/**
 * Created by iamchenxin on 2/15/16.
 */


function ts1(){
  var m = new Map();

  var k1 = 'aaa';
  var k2 = 'aaa';

  var a1 = ['aaa'];
  var a2 = ['aaa'];

  m.set(k1,111);
  m.set(k2,222);

  console.log(m.get(k1));
  console.log(m[k2]);

  console.log(a1==a2);
}


ts1();