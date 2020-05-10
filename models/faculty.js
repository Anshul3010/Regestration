const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

const facultySchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,'please enter a name']
    },
    username : {
        type : String,
        required : [true,'please enter a username'],
        unique : [true,'username already exists, Please enter a unique username']
    },

    password : {
        type : String,
        required : [true,'please enter a password'],
        select: false
    },
    passwordConfirm : {
        type : String,
        required : [true,'please re-enter the password'],
        validate : {
            validator : function(val){
                return val === this.password;
            },
            message : 'please re-enter the same password'
        }
    },
    department : {
        type : String
    },
    role:{
        type:String,
        default:'faculty'
    },
});


facultySchema.pre('save', async function(next) {
    if(!this.isModified('password')) {return next()};

    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

facultySchema.methods.comparePassword = async function(realPassword,enteredPassword){
     return await bcrypt.compare(enteredPassword,realPassword);
};





const facultyModel = mongoose.model('faculty',facultySchema);

module.exports = facultyModel;