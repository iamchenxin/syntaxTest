/**
 * Created by iamchenxin on 12/26/15.
 */

function log(txt){
    console.log(txt);
}

function ts(){
    let stdin = process.stdin;
    stdin.on("readable",()=>{
        log("begin block .. to read");

        let chunk = stdin.read();
        if(chunk){
            log(`chunk length = ${chunk.length} , chunk data = ${chunk}`);
        }else{
            log(" chunk = null");
        }




/*

        while ((chunk=stdin.read())!==null ){

            log(`chunk length = ${chunk.length} , chunk data = ${chunk}`);
        }
*/


    });
    stdin.on("end",()=>{
       log(" input end");
    });
}

export function ts2(){
    let stdin = process.stdin;
    stdin.on("readable",()=>{
       log(" \n\non readable -----------------------------------");

        let chunk=null;
        let count =0;
        while (true){
            chunk=stdin.read();
            count+=1;
            log(`count =${count},chunk=${chunk}`);
            if(chunk==null){
                log(" chuck = null &break");
                break;
            }else{
                log(`chunk length = ${chunk.length} , chunk data = ${chunk}`);
            }
        }
    });
    stdin.on("end",()=>{
       log("on end");
    });
}

function ts3(){
    let stdin = process.stdin;
    stdin.on("data",chunk=>{
       log("\n\non data ---------") ;
        if(chunk){
            log(`length = ${chunk.length},chunk = ${chunk}`);
        }else{
            log(`chunk=null =${chunk}`);
        }
    }).on("end",()=>{
        log("data end");
    });
}

var stream = require("stream");

class myStream extends stream.Readable{
    constructor(options){
        super(options);
        this.data=`
        Thank you for downloading PyCharm!

        Your download should start shortly. If it doesn't, please use direct link.
        Download and verify the file SHA-256 checksum.

        While PyCharm is downloading,
        please provide your email so we can send you a few non-intrusive useful materials during your trial period,
        to help you more easily harness the power of PyCharm and steadily increase your productivity.
        `;
        this.cursor=0;
        this.span=10;
    }

    _read(size){

        let wholeLength = this.data.length;
        let tmpstr =this.data.substr(this.cursor,this.span);
        this.cursor+=this.span;
        if(this.cursor>wholeLength){
            this.cursor-=this.span;
            this.span = wholeLength - this.cursor;
        }
        this.push(tmpstr,"utf8");
        log(`                                 length=${wholeLength},cursor = ${this.cursor},span =${this.span}`);

    }
}

function ts4(){
    log("-------");
    let ms = new myStream();
    ms.on("readable",()=>{
        let data = ms.read();
        log("get data ~~~~");
        log(data.toString());
    }).on("end",()=>{
        log("on end");
    })
}

function pipetest(){
    let tmp = new stream.Transform();

    tmp._transform=function(chunk,encoding,callback){
        this.push(`transform(${chunk})`);
        callback();
    };


    return tmp;
}

function ts5(){
    log("ts5 ~~~~~~~~~~~~");

    let ms = new myStream();
    ms.pipe(pipetest())
        .on("data",data=>{
        log("! get data");
        log(`======== ${ data.toString()} ==========`);
    }).on("end",()=>{
       log("on end !!1");
    });
}

var fs = require("fs");

function ts6(){
    let dirstream = fs.createReadStream("/home/iamchenxin/project/te/syntaxTest/src/event.js");
    let ws = fs.createWriteStream("/home/iamchenxin/project/te/syntaxTest/dst/tmp.txt");
    dirstream.pipe(pipetest()).pipe(process.stdout);
}


ts6();