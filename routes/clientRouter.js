const express=require('express'); 
const jwt=require('../middlewares/jsonwebtoken');
const controler=require('../controlers/client.controler');

const Router=express.Router();

const multer=require('multer');
const upload=multer({dest:'uploads/'});

Router.route('/addclient') 
        .post(upload.single('avatar'),controler.addclient);

Router.route("/login")
        .post(controler.login);
  
Router.route("/reserveCourse/:id")
        .post(jwt.verify,controler.addcourseToclient);


Router.route("/getClient")
        .post(jwt.verify,controler.getClient);       

module.exports=Router;        