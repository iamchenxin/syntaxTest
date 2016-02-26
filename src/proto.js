/**
 * Created by iamchenxin on 12/25/15.
 */
function log(txt){
    console.log(txt);
}

class A{
    constructor(){
        log("A created");
    }
    doA(){
        log("i am doA");
    }
}

class B_A extends A{
    constructor(){
        super();
        log("B_A created");
    }
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

var FB_A = function(){};
FB_A.prototype.doFB=function(){ log("iam fffbb");};
FB_A.prototype.__proto__ = B_A.prototype;
// javascript 真是一个奇怪的方案,  继承的实现是通过在 对象里 的 __proto__ 递归向上查找函数.
// new 是new 函数对象, 作用是把 函数的prototype 复制给新生的对象的__proto__, 然后所以prototype就是 储备创建时要复制的东西的仓库地址
// extends 似乎为了方便直接这样复制了 child_class.prototype.__proto__ = parent.prototype ,然后new 的时候就可以直接复制过去,免得再处理.
// 这样 new 的时候,就变成 instance.__proto__ = child_class.prototype, 然后就是完整的 instance.__proto__.__proto__ 不需要再处理了.
var c={};
c.__proto__={};
c.__proto__.__proto__=b.__proto__;  // extend from B_A

log(c.__proto__.__proto__ === B_A.prototype); // true
//c.outAdd_B_A();

var Class_C =function(){};
Class_C.prototype={};
Class_C.prototype.__proto__ =  B_A.prototype; //a class extend from B_A

var cc = new Class_C();
FB_A.prototype.__proto__ = cc.__proto__;
var ff=new FB_A();
ff.outAdd_B_A();