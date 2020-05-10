const Student = require('./../models/student');
const catchAsync = require('./../utils/catchAsync');
const Due = require('./../models/lib_due');
const ApiFeatures = require('./../utils/ApiFeatures');
const filterObject = require('./../utils/filterbody');

exports.createStudent = catchAsync(async(req,res,next)=>{
    const student = await Student.create({
                                                    full_name:req.body.full_name,
                                                    student_no:req.body.student_no,
                                                    roll_no:req.body.roll_no,
                                                    course:req.body.course,
                                                    branch:req.body.branch,
                                                    email:req.body.email,
                                                    mobile:req.body.mobile,
                                                    father_name:req.body.father_name,
                                                    year:req.body.year,
                                                    semester:req.body.semester
                                                    
    });
    res.status(200).json({
        status:'success',
        message:'you have been successfully registered',
        data:{
            student
        }
    });

});

exports.getAll = catchAsync( async (req,res,next) => {
    const allStudents = await Student.find({});
    res.status(200).json({
        status:'success',
        data : allStudents
    });
});

exports.getFilteredStudent = catchAsync( async (req,res,next)=>{
    const feature = new ApiFeatures(Student.find(), req.query).filter();
    const students = await feature.query;

    res.status(200).json({
        status: 'success',
        data : students
    });

})

exports.UpdateStudent = catchAsync( async (req,res,next) => {
    const student = await Student.findOne({student_no:req.body.student_no});
    const filteredObject = filterObject(req.body,'full_name','roll_no','course','branch','email','mobile','father_name','year','semester');
    const updateStudent = await Student.findByIdAndUpdate(student._id, filteredObject, {
        new:true,
        runValidators : true
    });
    res.status(200).json({
        status:'success',
        data : updateStudent
    });
});





