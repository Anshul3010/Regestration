const student = require('./../models/student');
const registeredStudent = require('./../models/register_student');

const catchAsync = require('./../utils/catchAsync');

exports.getCount = catchAsync( async (req,res,next) => {
    const StudentCount = await student.countDocuments({});
    const registeredCount = await registeredStudent.countDocuments({});
    

    res.status(200).json({
        status: 'success',
        data : {
            registered : registeredCount,
            student : StudentCount
        }
    });
});


exports.getSummery = catchAsync (async (req,res,next)=>{
    const StudentCount = await student.aggregate([
        
        {
            $group : {
                _id : '$branch', 
            }
        },
        {
            $count : 'totalStudents'
        }
    ]);

    const registeredCount = await registeredStudent.aggregate([
        
        {
            $group : {
                _id : '$branch', 
            }
        },
        {
            $count : 'totalRegesteredStudents'
        }
    ]);


    res.status(200).json({
        status:'success',
        data : {
            students : StudentCount,
            registered : registeredCount
        }
    });
})