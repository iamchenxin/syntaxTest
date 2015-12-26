import "babel-polyfill";

var Promisify2 =require( "promisify-node");
//var oldFs = require("fs");

var fs = Promisify2("fs");
console.log(" async.js .....");

class AAA{
    ts(){
        let p =fs.readdir(".");
        p.then(rt=>{
            console.log(rt);
        })
    }

    async ts2(){
        let fls = await fs.readdir(".");
        console.dir(fls);
        for(let f of fls){
            console.log(f);
        }
    }
}
var a =new AAA();

a.ts2();