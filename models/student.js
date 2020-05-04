const mongoose = require('mongoose');
const validator = require('validator');

const Schema =mongoose.Schema;

var StudentSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required:[true,"name field is required"]
    },

    student_no:{
        type: Number,
        required:[true,"Student no. field is required"],
        // max:[7,"student no. feild must have 7 numbers"],
        // min:[7,"student no. feild must have 7 numbers"]
    },

    roll_no:{
        type:Number,
        required:[true,"Roll no. field is required"]
    },
    year:{
        type:Number,
        required:[true,"please enter a year"]
    },
    semester:{
        type:Number,
        required:[true,"please enter your semester"]
    },
    course:{
        type:String,
        //enum:['IT','CSE',],
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
        required:[true,"Mobile number field is required"],
        // max:[10,'please enter a valid contact number'],
        // min:[10,'please enter a valid email number']
    },

   father_name:{
       type:String,
       required:[true,"Fathers name field is required"]
   },
   role:{
       type:String,
       default: 'student'
   }
});
const Student = mongoose.model("student", StudentSchema);
module.exports = Student;