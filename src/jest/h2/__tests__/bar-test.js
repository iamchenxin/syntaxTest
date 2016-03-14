// __tests__/bar-test.js
jest.dontMock('../bar');

import bar from '../bar';
//var bar = require('../bar');
describe('test1',function() {
  it('my frist',function() {
    console.warn(bar);
  //  console.warn(foo.default('aaa'));

    expect(bar('foo')).toBe('aaa');
  });
});