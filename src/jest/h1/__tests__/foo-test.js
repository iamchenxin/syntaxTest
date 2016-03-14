/*eslint-env jest, es6 */
// __tests__/foo-test.js
jest.dontMock('../foo.js');


 //  var hello = require('../hello'); 
var foo = require('../foo.js');
describe('test1',function() {
  it('my frist',function() {
  var h = foo('foo');
  //  console.warn(hello);     
   expect(h).toBeCalledWith('fooo');
   
    //expect(foo('foo')).toBe('aaa');
  });
});