const Due = require('./../models/lib_due');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.createDue =  catchAsync( async (req,res,next)=>{
    const due = await Due.create({
        roll_no:req.body.roll_no,
        student_no:req.body.student_no,
        full_name:req.body.full_name,
        due:req.body.lib_due,
        branch:req.body.branch
    });
    res.status(200).json({
        status:'success',
        message:'you have been successfully registered in due table',
        data:{
            due
        }
    });
});

exports.cleardue = catchAsync(async (req,res,next)=>{
    const due = await Due.updateOne({roll_no: req.body.roll_no},{$set:{lib_due:false}});
    if(!due){
      return next(new AppError('No student found with this roll number, Please enter a valid roll number',404));
    }
    
    res.status(200).json({
      status: 'success',
      message: 'dues has been cleared'
    });
  });

  exports.checkDue = catchAsync(async (req,res,next)=>{
    const check = await Due.findOne({roll_no:req.user.roll_no});
    if(check && check.lib_due === true){
      return next(new AppError('please clear out your dues before you proceed',401));
    }
    res.status(200).json({
      status:'success',
      message : 'no dues found'
    });

  })