

const express=require("express");
const jwt=require('../middlewares/jsonwebtoken');



const Router=express.Router();


const controler=require("../controlers/courses.controler");

Router.route("/getAllCourses")
                    .get(controler.getAllCourses);
 

Router.route("/addCourse") 
                    .post(controler.addCourse);



Router.route("/deleteCourse")
                    .post(controler.deleteCourse);               



Router.route("/replaceCourse")
                    .post(controler.replaceCourse);      
                    
Router.route("/getCourses")
                    .post(jwt.verify,controler.getCourses);
module.exports=Router;                                          