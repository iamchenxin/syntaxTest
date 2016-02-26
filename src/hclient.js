/**
 * Created by iamchenxin on 12/28/15.
 */
import * as http from "http";

function log(txt){
    console.log(txt);
}

function ts(){

    let data = JSON.stringify({
        "msg":"hello!"
    });

    var options = {
        hostname: 'localhost',
        port: 22222,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };

    var client = http.request(options,response=>{
        log(`status: ${response.statusCode}`);
        log(`HEADER : ${JSON.stringify(response.headers)}`);

        response.setEncoding("utf8");
        response.on("data",chunk=>{
            log(`Body : ${chunk}`);
        }).on("end",()=>{
            log(" data end");
        })
    });

    client.on("error",e=>{
        log(`error message = ${e.message}`);
    });

    client.write(data);
    client.end();
}

ts();