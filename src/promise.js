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

class Chain2{

    // arg = {init=null,parent=null,exec=null}
    constructor(arg){
        this.exec=arg.exec;
        this.value=null;
        this.nextNode = null;
        this.parent = null;
        if(arg.parent){
            this.parent = arg.parent;
            arg.parent.nextNode = this;
        }else{
            setTimeout(()=>{
                arg.init(this);
            },0);
        }
    }



    // this is a creator ~~~
    then(exec){
        return new Chain2({exec:exec,parent:this});
    }

    resolve(rt){
        Chain2.run(rt,this.nextNode);
    }

    static run(rt,node){
        if(!node){
            return ;
        }
        let client = node.exec(rt);

        if(  client instanceof  Chain2){
            client.then(function (rt) {
                Chain2.run(rt,node.nextNode);
            })
        }else{
            Chain2.run(rt,node.nextNode);
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

function c2log(txt,time){
    let tmp = new Chain2({init:function(chain){
        setTimeout(()=>{
            log(`cclog : ${txt}`);
            chain.resolve(txt);
        },time);
    }});
}

function  tsChain2(){
    let p = new Chain2({init:function(chain){
        setTimeout(()=>{
            log(`chain init `);
            chain.resolve(` tsChain2 :`);
        },1000);
    }});

    p.then(rt=>{
        log(" then 2");
        return c2log(`2~22~ ${rt}`,1000);
    }).then(rt=>{
        log(" then 3");
        return c2log(`3~~ ${rt}`,8000);
    }).then(rt=>{
        log(" then 4");
        return c2log(`4~~ ${rt}`,2000);
    }).then(rt=>{
        log(" then 5");
        return c2log(`4~~ ${rt}`,2000);
    });}

tsChain2();