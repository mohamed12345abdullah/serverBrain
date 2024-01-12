
const client=require('../mongoose.models/client.model');  
const course=require('../mongoose.models/course.model');
const JWT=require('../middlewares/jsonwebtoken');
const { log } = require('console');


const addclient=async(req,res)=>{
    const{email,name,password,picture }=req.body;
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa",req.body); 
    const oldColient= await client.findOne({email});
    if(oldColient){
        res.status(400).end("user are exsists");
    }else{
        const newClient= new client({
            email,
            name,
            password,
            picture
        });
        console.log("new client is : ", newClient);
        // await newClient.save();
        const token=JWT.generatetoken({email});
        //responseText
        res.status(201).json(token);
         
    }

} 

const login=async(req,res)=>{
    console.log(" req.body is : ", req.body);
    const {email,password}=req.body; 
    const oldClient= await client.findOne({email,password});
    if(oldClient){ 
        const token=JWT.generatetoken({email,id:oldClient._id});
        // res.write(oldClient._id);
        res.status(200).json(token);
    }else{
        res.status(404).end("nottttt found ") 
    }
}

// const oldClient=await client.findByIdAndUpdate(id,{$push:{courses:courseId}});

const addcourseToclient=async(req,res)=>{ 
    const email=req.email;
    console.log(" email is : ",email);
    const courseId=req.body.courseId;
    console.log("course id d d d d d d",courseId);
    const oldClient=await client.findOne({email});
    oldClient.courses.push(courseId);
    oldClient.save();
    res.status(200).end(" secess add course ");
}

const getClient=async(req,res)=>{
    const email=req.email;
    const oldClient=await client.findOne({email});
    let courses=[];

    for(var i=0; i<oldClient.courses.length;i++){
        async function getCourse(){
            return await course.findOne({_id:oldClient.courses[i]});
        }
         
        await getCourse().then(
            (res)=>{courses.push(res); console.log(res);}
        )
    }
  
    console.log(" arr courses : ",courses);
    // courses.push(22,33);
    res.status(200).json({data:{oldClient,courses}}); 
}
module.exports={
    addclient,
    login,
    addcourseToclient,
    getClient,
}