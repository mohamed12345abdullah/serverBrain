
const { throws } = require('assert');
const { error } = require('console');
const JWT=require('jsonwebtoken');


const generatetoken=(payload)=>{ 

    const token=JWT.sign(payload,process.env.secret,{expiresIn:'60m'});
    return token; 

}; 
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsbGFoQGVtYWlsLmNvbSIsImlkIjoiNjU3ODU1ODFiMjE3YTAxZWM5OWYxYTUwIiwiaWF0IjoxNzAyNjQwMTU1LCJleHAiOjE3MDI3MjY1NTV9.g6Le4EWNScWdo3WgSUPVBmdeJsn5eD29fR9v_TZMrKY";
const verify=(req,res,next)=>{
    console.log("verify");
    try{
    console.log("token is  : ",req.body.token);
    console.log("type of token is  : ",typeof(req.body.token));
    const decoded=JWT.verify(req.body.token,process.env.secret);
    // console.log(decoded);
    
        console.log(" decodeddddd : ", decoded);
        req.email=decoded.email;
        next();
    }catch(e){
        console.log("errr");
        res.status(401).end("expireddddd");
    }
} 

module.exports={
    generatetoken,
    verify,
}