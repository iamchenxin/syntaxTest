/*eslint-env node, es6 */

var hello = require('./hello');
function foo(msg){
  console.warn(`\nfoo(msg)-------------`);
  console.warn(hello);
  hello(msg);
  return hello;
}

module.exports = foo;
