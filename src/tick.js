/**
 * Created by iamchenxin on 12/30/15.
 */
function costTime(count){
    console.log(`***costtime [${count}]`);
    console.time("ct");
    let rt=0;
    for(let i=0;i<count;i++){
        for(let j=0;j<1000;j++){
            rt = (Math.random()+rt)/2;
        }
    }
    console.timeEnd("ct");
    console.log(`***costtime end ~ rt=${rt}`);
}

function tsTick(tag){
    console.time(tag);
    console.log(`\n\n       tick [${tag}] begin:`);
    process.nextTick(function(){
        let now = process.hrtime()
        console.timeEnd(tag);
        console.log(`           tick [${tag}] end,time is ${now[0]}s,${now[1]/1000000}ms  `);

    });
}

var events = require("events");

var ee =new events.EventEmitter();

ee.on("mye",function(tag){
    console.timeEnd(tag);
    console.log(`++++ mye ++++ get [${tag}]`);
});

function eeSend(tag){
    console.time(tag);
    console.log(`++++ (mye) send event with [${tag}]`);
    ee.emit("mye",tag);
}

function log(txt)
{
    console.log(txt);
}

function tsTick() {


    process.nextTick(function () {
        log("tk_aaaa");
        process.nextTick(function () {
            log("  tk_BB1");
            process.nextTick(function () {
                log("      tk_C1");
                costTime(1000);
            });
            process.nextTick(function () {
                log("      tk_C2");

            });
        });
        process.nextTick(function () {
            log("  tk_BB2");
            setTimeout(function timeout() {
                console.log('TIMEOUT FIRED~~~');
            }, 0);
            costTime(1000);
        });
        log("tk_aaaa <----------");
    });
}

function tsImid(){
    setImmediate(function () {
        log("tk_aaaa");
        setImmediate(function () {
            log("  tk_BB1");
            setImmediate(function () {
                log("      tk_BB1_C1");

                costTime(5);
            });
            setImmediate(function () {
                log("      tk_BB1_C2222");
                log("! reg two set");
                setImmediate(function () {
                    log("        tk_BB1_C2222_D1");

                });
                setImmediate(function () {
                    log("        tk_BB1_C2222_D2");

                });
                log("!reg time2");
                setTimeout(function timeout() {
                    console.log('TIMEOUT FIRED 22~~  ~');
                }, 0);
            });
            log("!reg time1");
            setTimeout(function timeout() {
                console.log('TIMEOUT FIRED~~  ~');
            }, 0);
        });
        setImmediate(function () {
            log("  tk_BB2");

            setImmediate(function () {
                log("      tk_BB2_C1");
                setImmediate(function () {
                    log("        tk_BB2_C1_D1");

                });
                setImmediate(function () {
                    log("        tk_BB2_C1_D2");

                });

            });
            setImmediate(function () {
                log("      tk_BB2_C2");
                costTime(10);
            });

          //  costTime(1000);
        });
        log("!!reg time A")
        setTimeout(function timeout() {
            console.log('TIMEOUT FIRED AAAA~  ~');
        }, 0);
        log("tk_aaaa <----------");
    });
}



function tsImid2(){
    setImmediate(function(){
        log("  immediate a1!");
        setTimeout(function timeout() {
            console.log('    a1_TIMEOUT FIRED AAAA~  ~');
        }, 0);
    });
    setImmediate(function(){
        log("  immediate a2!");
        setImmediate(function(){
            log("    immediate a2_c !");
        });
        costTime(500);
    });

}

tsImid2();
/*

process.nextTick(function(){
    tsTick("tk_a");
    costTime(1000);
    process.nextTick(function() {
        tsTick("tk_b1");
        costTime(1000);
        process.nextTick(function() {
            tsTick("tk_c1");
            costTime(1000);
        });
        process.nextTick(function() {
            tsTick("tk_c2");
            costTime(1000);
        });
    });
    process.nextTick(function() {
        tsTick("tk_b2");
        costTime(1000);
    });

});

tsTick("1000");
eeSend("e1");
costTime(1000);
eeSend("e2");
tsTick("10000");
costTime(10000);
eeSend("e3");
tsTick("20000");
costTime(20000);
*/