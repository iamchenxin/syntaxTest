jest.unmock('../promise-st');
const Promise = require('../promise-st.js').default;
global.Promise = Promise;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
//import Promisemy from '../promise-st.js';

describe('x', () => {
  pit('test 1', () => {
    console.log('test begin');
    console.dir(Promise);
    let p = new Promise((resolve, reject) => {
  //    setTimeout(()=>{
        const r = Math.random();
        console.log(` r = [${r}]`);
        if(r>0.5){
          resolve('hello!');
        }else {
          reject(' a error');
        }
  //    },500);

      console.log('i am in cons');
    });
    p.then(result => {
      console.log(`get [${result}]`);

    });
//    console.log(p.catch);
    /*
    let p2 = new Promise(function(resolve, reject) {
      resolve('native promise');
    });
    */
//    console.log(Object.keys(p2));
    return p;
  });
});
