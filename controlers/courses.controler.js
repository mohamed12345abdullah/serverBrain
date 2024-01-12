require('dotenv').config();

// const uri="mongodb+srv://mohamed12345abdullah:abdo123@cluster0.hblrffd.mongodb.net/courses?retryWrites=true&w=majority";
const uri=process.env.MONGO_URL;


// mongoose
 const mongoose=require("mongoose");
 mongoose.connect(uri);
 const course=require("../mongoose.models/course.model");
 const client=require('../mongoose.models/client.model');
const { resolve } = require('path');

 


const getAllCourses=async(req,res)=>{
    var courses=await course.find();
    res.json(courses);
}

const addCourse=async (req,res)=>{
    if(!req.body.title || !req.body.price){
        return res.end(" bad request ")
    }
    const newCourse=new course(req.body);
    await newCourse.save();
    res.json(req.body);  

}

const deleteCourse= async(req,res)=>{
    console.log("id is : "+req.body.id);
    res.end("id is : "+req.body.id);

}

const replaceCourse=async(req,res)=>{
    res.json(req.body);
}


const getCourses=async(req,res)=>{

    const _id=req.id;

    const clientdata=await client.findById(_id);
    const coursesID=clientdata.courses;
    var arrofCourses=[];
    for(var i=0; i<coursesID.length;i++)
    {
        async function getCourses(){
            var cours=await course.findById(coursesID[i]);
            console.log(await cours);
            // arrofCourses.push(await cours );
            // console.log(await arrofCourses[i]," pushhhhhhhh");
            return cours;
        }

        
        await getCourses().then(
            (resolve)=>{ arrofCourses.push(resolve);}
        ).then(
            ()=>{ console.log(`push sh sh ${i}` , arrofCourses[i]);}
        )
    }
    res.status(200).json(arrofCourses);

}


// console.log("alement    "+e);
// var cours=await course.findById(e)
// .then(arrofCourses.push(cours), console.log(cours+"  course"))
// .then(console.log("aa"));


module.exports={
    getAllCourses,
    addCourse,
    deleteCourse,
    replaceCourse,
    getCourses
}