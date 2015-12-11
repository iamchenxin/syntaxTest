/**
 * Created by iamchenxin on 15-12-12.
 */
'use strict';

    // class style promise .
    // the essential of promise is pass a trigger to callback ,and use that trigger to call cached execs( catched by then)

function log(txt){
    console.log(txt);
}

class Chain{
    //init(chain)
    constructor(init){
        this.execs=[];
        this.value=null;

        setTimeout(()=>{
            //   console.dir(this);
            init(this);
    },0);

    }

    // exec(v);
    then(exec){
        this.execs.push(exec);
        return this;
    }

    resolve(rt){
        if(this.execs.length>0){
            this.run(rt,0);
        }
    }

    run(rt,i){
        if(i>=this.execs.length){
            return;
        }
        let exec = this.execs[i];
        let j=i+1;
        let corv = exec(rt);

        let ob=this;
        if( corv instanceof Chain){
            log("Chain ~~");
            corv.then(function(rt){
                ob.run(rt,j);
            });
        }else {
            ob.run(corv,j);
        }
    }
}

function cclog(txt,time){
    let tmp= new Chain(chain=>{
            setTimeout(()=>{
                log(`cclog : ${txt}`);
    chain.resolve(txt);
},time);
});

    return tmp;
}

function tschain3(){

    let p = new Chain(pro=>{
            console.log("test bigen");
    setTimeout(function(){

        pro.resolve("mmm");
    },1000);
    console.log("set time");
});


    p.then(rt=>{
        log(" then 2");
    return cclog(`2~22~ ${rt}`,1000);
}).then(rt=>{
        log(" then 3");
    return cclog(`3~~ ${rt}`,8000);
}).then(rt=>{
        log(" then 4");
    return cclog(`4~~ ${rt}`,2000);
}).then(rt=>{
        log(" then 5");
    return cclog(`4~~ ${rt}`,2000);
});

}

tschain3();