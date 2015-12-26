/**
 * Created by iamchenxin on 12/25/15.
 */
function log(txt){
    console.log(txt);
}

class A{
    doA(){
        log("i am doA");
    }
}

class B_A extends A{
    doB(){
        log("i am doB");
    }
}

var a =new A();
var a1= new A();
var b =new B_A();

a.__proto__.outAdd1=function(){
    log("iam a add from outside");
};
B_A.prototype.outAdd_B_A=function(){
    log(" out add b_a");
    this.doB();
    this.outAdd1();
    this.doA();
};

var c={};
c.__proto__={};
c.__proto__.__proto__=b.__proto__;  // extend from B_A

log(c.__proto__.__proto__ === B_A.prototype); // true
c.outAdd_B_A();
