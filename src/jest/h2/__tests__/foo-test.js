// __tests__/foo-test.js
jest.dontMock('../foo.js');
var foo = require('../foo.js');
describe('test1',function() {
  it('my frist',function() {
    console.warn(foo);
   // console.warn(foo.default('aaa'));

    expect(foo('foo')).toBe('aaa');
  });
});