const Faculty = require('../models/faculty');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.createFaculty = catchAsync(async (req,res,next) => {
    await Faculty.create({
        name:req.body.name,
        username:req.body.username,
        department:req.body.department,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    });
    res.status(200).json({
        status: 'success',
        message: 'A faculty record has been created'
    });
});



exports.Updatefaculty = catchAsync( async (req,res,next) => {
    const filteredObject = filterObject(req.body,'name','username','department');
    const updateFaculty = await Faculty.findByIdAndUpdate(req.user._id, filteredObject, {
        new:true,
        runValidators : true
    });
    res.status(200).json({
        status:'success',
        data : updateFaculty
    });
});