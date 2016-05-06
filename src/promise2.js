class Chain{
//  let codeBlocks = [];
  constructor(codeBlock){
    this.codeBlocks = [];
    this.codeBlocks.push(codeBlock);
    this.currBlockIndex =0;
    this.currResult;
  }

  _execute(){
    let result;
    setTimeout(()=>{

    },0);
  }

  _exe(){
    this.currResult = this.codeBlocks[this.currBlockIndex](this.currResult);
    this.currBlockIndex = this.currBlockIndex + 1;

    if(this.currResult instanceof Chain){
      this.currResult.then(result => {
        this.currResult = result;
        this._exe();
      });
    } else {
      this._exe();
    }
  }

  resolve(value){
    this.currBlockIndex = this.currBlockIndex +1;
    this.codeBlocks[this.currBlockIndex](value,this);
  }
}

class Op{
  constructor(codeBlock){
    this.codeBlocks = [];
    this.codeBlocks.push(codeBlock);
    this.currBlockIndex =0;
    setTimeout(()=>{
      this.codeBlocks[0](this);
    },0);

  //  this.currResult;
  }

  nextCode(result){
    this.currBlockIndex = this.currBlockIndex + 1;
    if(this.currBlockIndex >= this.codeBlocks.length){
      console.log(`codeBlocks end,length = ${this.codeBlocks.length}`);
      return result;
    }
    this.codeBlocks[this.currBlockIndex](this,result);
  }

  then(codeBlock){
    this.codeBlocks.push(codeBlock);
    return this;
  }
}
function Opc(codeBlock){
  return new Op(codeBlock);
}

function Fp(codeBlock){
  const codeBlocks=[];
  let currBlockIndex =0;

  codeBlocks.push(codeBlock);
  setTimeout(()=>{
    codeBlocks[0](nextNode);
  },0);

  function nextNode(result) {
    currBlockIndex = currBlockIndex +1;
    if(currBlockIndex>=codeBlocks.length){
      return result;
    }
    codeBlocks[currBlockIndex](nextNode,result);
  }

  this.then = function(codeBlock){
    codeBlock.push(codeBlock);
    return this;
  };
}

class Pro {
  constructor(codeBlock) {
    this.resultCode = null;
    setTimeout(()=>{
      codeBlock(this);
    },0);
  }

  done(result){
    this.resultCode(result);
  }

  then(resultCode){
    this.resultCode = resultCode;
    return this;
  }
}

class Pro2 {
  constructor(asyncCode) {
    this.resultCodes = [];
    this.currCodeIndex = 0;
    setTimeout(() => {
      asyncCode(this);
    },0);
  }

  done(result){
    this.nextCode(result);
  }

  nextCode(result){
    if(this.currCodeIndex>=this.resultCodes.length){
      return result;
    }
    result = this.resultCodes[this.currCodeIndex](result);
    this.currCodeIndex = this.currCodeIndex + 1;
    if(result instanceof Pro2) {
      result.then((result)=>{
        this.nextCode(result);
      });
    }else {
      return this.nextCode(result);
    }
  }

  then(resultCode){
    this.resultCodes.push(resultCode);
    return this;
  }
}


function aslog(txt,time,op){
  console.log(`[${txt}] BEGIN   ,time=${time},`);
  setTimeout(()=>{
    console.log(`     [${txt}] delay,in setTimeout,`);
    return op.nextCode(time);
//    console.log(`     [${txt}] delay,i am end`);
  },time);
  console.log(`[${txt}] end   ,time=${time},`);
}



function ts(){
  console.log('ts!!');

  Opc((op,rt)=>aslog('init', 500, op))
  .then((op,rt)=>aslog('2nd', 1200, op))
  .then((op,rt)=>{
    console.log(`!! i am a sync test,prev rt = ${rt}`);
    op.nextCode('sync');
    console.log('   [sync],   end!');
  })
  .then((op,rt)=>aslog('3td', 5000, op))
  .then((op,rt)=>{
    console.log('ENDENDEND '+rt);
    console.log((new Error()).stack);
  });

  console.log('ts end!!');

}

function ts2(){
  console.log('ts2~~~~~~~~~');
  let fa = function(){
    return new Chain(chain => {
      console.log('init');
      const time =500;
      setTimeout(()=>{
        chain.resolve(`1st,init,${time}`);
      },time);
      return time;
    });
  };

  fa.then(result => {
    return new Chain(chain => {
      console.log('2nd');
      const time =800;
      setTimeout(()=>{
        chain.resolve(`2nd,${time},pre = ${result}`);
      },time);
      return time;
    });
  }).then( result => {
    let data = `none async, pre = ${result}`;
    console.log(data);
    return data;
  });
}

ts();
