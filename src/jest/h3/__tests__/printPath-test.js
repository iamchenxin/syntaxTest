jest.mock('fs');
jest.dontMock('../printPath');


describe('printPath test',()=>{
  var testf = {
    '/testdir':{
        'hello.js':'how ra you',
        'tom.json':'i am tom ss'
      }
  }

  beforeEach(() =>{
    const fs = require('fs'); 
      console.warn(fs);
    fs.__setMockFiles(testf);
  });
  
  it('first test',() =>{
    const printPath = require('../printPath');
    expect(printPath('/testdir')).toBe('aaa');
  });
});