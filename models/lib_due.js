const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var dueSchema = new mongoose.Schema({
    roll_no: {
        type: String,
        required:[true,"Category field is required"],
        unique:[true,"roll_no must be unique"]
        
    },
    student_no:{
        type: String,
        required:[true,'please enter a student number'],
        unique:[true,'please enter a unique student number']
    },
    branch:{
        type:String,
        required:[true,'please enter a branch']
    },
   
    full_name:{
        type:String,
    },

    lib_due:{
        type:Boolean,
        required:[true,'please enter about the library due status of the student'],
        default:false
    }

});

const Due = mongoose.model("library_due", dueSchema);
module.exports = Due;
