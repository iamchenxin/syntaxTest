
function delog(txt,time,callback){
  setTimeout(()=>{
    console.log(`${txt},${time}`);
    callback();
  },time);
}

function ts(){
  delog('1111', 100, ()=>{
    delog('222', 200, ()=>{
      delog('333', 200, ()=>{
        delog('444', 200, ()=>{
          console.log('end!');

        });
        console.log((new Error()).stack);
      });
    });

  });
}

function ts2() {
  delog('1', 100, n1);
  function n1() {
    delog('2', 1000, n2);
  }
  function n2() {
    delog('3', 100, n3);
  }
  function n3() {
    delog('4', 1000, ()=>{
      console.log('end');
    });
  }
}

function ts3() {
  a1();

  function a1() {
    console.log('a1');
    a2();
  }
  function a2() {
    console.log('a2');
    a3();
  }
  function a3() {
    console.log('a3');
    a4();
  }
  function a4() {
    console.log('a4');
    console.log((new Error()).stack);
  }
}

ts3();
