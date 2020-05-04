const mongoose = require('mongoose');
const validator = require('validator');
const Schema =mongoose.Schema;

var RegisterSchema = mongoose.Schema({
    full_name: {
        type: String,
        required:[true,"name field is required"]
    },

    student_no:{
        type: Number,
        required:[true,"Student no. field is required"],
        unique:[true,"Student_no must be unique"]
    },

    roll_no:{
        type:Number,
        required:[true,"Roll no. field is required"],
        unique:[true,"Roll_no must be unique"]
    },

    session:{
        type:String
        
    },

    semester:{
        type:Number,
        required:[true,"semester field is required"]
    },

    course:{
        type:String,
        required:[true,"Course field is required"]
    },

    branch:{
        type:String,
        required:[true,"Branch field is required"]
    },
    
    email:{
        type:String,
        required:[true,"Email field is required"],
        validate:[validator.isEmail,'please enter a valid email']
    },
   
    mobile:{
        type:Number,
        required:[true,"Mobile number field is required"]
    },

   father_name:{
       type:String,
       required:[true,"Fathers name field is required"]
   },

   address:{
    type:String,
    },
    year:{
        type:Number,
        required:[true,"please enter a year"]
    },
    role:{
        type:String,
        default : 'student'
    }
});


const Registartion_model = mongoose.model("registered", RegisterSchema);
module.exports = Registartion_model;