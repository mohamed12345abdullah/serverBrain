const mongoose=require('mongoose');
// const { Script } = require('vm');

const clientschema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    courses:[ 
        {
            type:String,
        }
    ],
    tasks:
        [ 
            {
                taskId:String,
                rate:String,
            }
        ],
    picture:{ 
        type:String,
        default:"../../server/uploads/profile/default.jpg"
    }    
    
}) 

const clientModel=mongoose.model("Client",clientschema);
module.exports=clientModel; 

  
/*
    email:{
        type:Script,
        require:true
    },
    name:{
        type:Script,
        require:true
    },
    password:{
        type:Script,
        require:true,
    },
    courses:[ 
        {
            type:Script,
        }
    ],
    tasks:
        [ 
            {
                taskId:Script,
                rate:Script,
            }
        ]
*/