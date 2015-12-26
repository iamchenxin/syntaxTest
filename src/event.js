/**
 * Created by iamchenxin on 12/26/15.
 */
var EventEmitter = require('events');
function log(txt){
    console.log(txt);
}

class myE extends EventEmitter{
    constructor(){
        super();
    }
    fire_emit(){
        log("fire");
        setTimeout(()=>{
            log("next count? fire");
            this.emit("fire");
        },0);

    }

}

function d_call(callback){
    callback("iam","d_call");
}

function get_data(err,data){
    log(`err = ${err}`);
    log(`data = ${data}`);
}

var e = new myE();
e.on("fire",get_data);

e.fire_emit();

setTimeout(function(){
    log("set time ~~");
},0);

d_call(get_data);
