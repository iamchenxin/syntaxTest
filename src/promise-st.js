/*
* @flow
*/
class Promisemy {
  successCode:Array<Function>;
  errorCode:Array<Function>;
  error:mixed;
  result:mixed;
  status:'resolved'|'rejected'|'pending';
  constructor(executor) {
    this.result = null;
    this.status = 'pending';
    this.error = null;
    this.successCode =[];
    this.errorCode = [];

    setTimeout( () => {
      this._execute(executor);
    }, 0);

  }

  _execute(executor) {
    executor(
    (result) => {
      this.result = result;
      this.status = 'resolved';
      this.successCode.map(code => code(result));
    }, (error) => {
      this.error = error;
      this.status = 'rejected';
      this.errorCode.map(code =>code(error));
    });
  }

  then(successCode, errorCode) {
  //  console.log(`in then successCode = [${successCode}], errorCode = [${errorCode}]`);
    switch (this.status) {
    case 'pending':
      if (successCode) {this.successCode.push(successCode);}
      if (errorCode) {this.errorCode.push(errorCode);}
      break;
    case 'resolved':
      if (successCode) {successCode(this.result);}
      break;
    case 'rejected':
      if (errorCode) {errorCode(this.error);}
      break;
    default:
    }
    return this;
  }

  catch(errorCode) {
    return this.then(null,errorCode);
  };

}



function ts(){
  console.log('test begin');
  let p = new Promisemy((resolve, reject) => {
    setTimeout(()=>{
      const r = Math.random();
      console.log(` r = [${r}]`);
      if(r>0.5){
        resolve('hello!');
      }else {
        reject(' a error');
      }
    },500);

    console.log('i am in cons');
  });
  p.then(result => {
    console.log(`get [${result}]`);
  }).catch(error => {
    console.log('catch a error');
    console.log(error);
  });
}

//ts();

//module.exports = Promisemy;
export {
  Promisemy as default
};
