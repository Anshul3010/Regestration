const Faculity = require('./../models/faculity');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');


exports.createFaculity = catchAsync(async (req,res,next) => {
    await Faculity.create(req.body);
    res.status(200).json({
        status: 'success',
        message: 'A faculity record has been created'
    });

});