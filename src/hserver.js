/**
 * Created by iamchenxin on 12/28/15.
 */
import * as http from "http";

function log(txt){
    console.log(txt);
}

function ts(){
    let server = http.createServer( (req,res)=>{
        let data="";
        req.setEncoding("utf8");
        let str="";
        log(" a request received ~");
        let em1=" \u2614 我们 \u{F36D} \u{1F36E}\u{20E3} \u{1F399}\u{20E0} \u{1F399} \u{1F622} \u{1F647} \u2744 \u2754 \u2753 \u0033\u20E3 \u2197 \u{1F304} \u{1F320} \u{1F40E} \u{1F48F} \u{1F4A2} \u{1F4F6}";
        let em2 =" \u{1F465}";
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(`\n ${em1} \n`);
        res.write(`\n ${em2} \n`);
        res.end("\nend\n");
        req.on("data",chunk=>{
            data+=chunk;
            console.log(`chunk = ${chunk}`);
        }).on("end",()=>{
            try{
                str=JSON.parse(data);
            }catch (err){
                return res.end(`error: ${err.message}`);
            }
            console.log(`get ~ ${data}`);
            var request =req;

          //  res.write(JSON.stringify(request.rawHeaders));


        });
    });

    server.listen(22222);
    console.log("server begin ...");
}

ts();