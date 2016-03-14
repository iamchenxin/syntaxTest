/*eslint-env node, es6 */
function hello(msg) {
  var a=1;
  console.warn(`i am hello,get msg [${msg}]`);
  return `${a} hello ${msg}`;
}

module.exports = hello ;
