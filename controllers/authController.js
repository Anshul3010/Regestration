const catchAsync = require('./../utils/catchAsync');
const Faculity = require('./../models/faculity');
const AppError = require('./../utils/AppError');
const jwt = require('jsonwebtoken');
const Student = require('./../models/student');
const RegisteredStudents = require('./../models/register_student');
const Due = require('./../models/lib_due');
const {promisify} = require('util');

const generateToken = (userID,role) => {
    let token =  jwt.sign({ id: userID,role:role }, process.env.JWT_SECERET, {
      expiresIn: process.env.JWT_EXPIRY
    });
    const r_token = `Bearer ${token}`;
    return r_token;
  };
  
  const createSendToken = (user, statusCode, res, count) => {
     count = count || 0;
    const token = generateToken(user._id,user.role); 
    const cookieOptions = {
      expiresAt: new Date (Date.now() + process.env.JWT_COOKIE_EXPIRY *24*60*60*1000),
      httpOnly: true
    };
    
    res.cookie('jwt',token,cookieOptions);
    
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.status(statusCode).json({
      status: 'success',
      data: {
        count
      }
    });
  };

exports.studentLogin =catchAsync(async (req,res,next)=>{
  if(req.cookies.jwt){
    return next(new AppError('someone already logged in, please wait for him to logOut',400));
  }
    const { student_no } = req.body;
    const { full_name } = req.body;

    // checking weather the user has entered an student no. and a name
    if (!student_no || !full_name) {
        return next(new AppError('please enter a student number and name', 400));
    }
    // matching the entered student number and name from the database
    const student = await Student.findOne({ student_no: student_no,full_name:full_name});
    if(!student){
        return next(new AppError('you are not a student of this institute',404));
    }
    createSendToken(student, 200, res);
  });

  exports.faculityLogin =catchAsync(async (req,res,next)=>{
    if(req.cookies.jwt){
      return next(new AppError('someone already logged in, please wait for him to logOut',400));
    }
      const { username } = req.body;
      const { password } = req.body;
  
      // checking weather the user has entered an student no. and a name
      if (!username || !password) {
          return next(new AppError('please enter a please enter a username and a password', 400));
      }
      // matching the entered username and name from the database

      const faculity = await Faculity.findOne({username : username}).select('+password');
      if(!faculity || !await faculity.comparePassword(faculity.password,password)){
        return next(new AppError('username or password did not match',401));
      }
      let count = 0;
      if(faculity.role === 'faculity'){
        
        
        const registeredCount = await RegisteredStudents.countDocuments({});
        const studentCount = await Student.countDocuments({});
        const remainingStudents = studentCount-registeredCount;

        count = {
          registeredCount : registeredCount,
          studentCount : studentCount,
          remainingStudents : remainingStudents
        };
        
        
      }
      
      createSendToken(faculity, 200, res, count);
    });

exports.protect = catchAsync(async (req,res,next)=>{
    let token;
    let user;
  //check weather there is a token in the request cookie or not
  if (!req.cookies.jwt) {
    return next(new AppError('you are not loged in', 401));
  }
  if (
    req.cookies.jwt &&
    req.cookies.jwt.startsWith('Bearer')
  ) {
    token = req.cookies.jwt.split(' ')[1];
  }

  //check weathetr the token is valid or not

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERET);

  // check weather the uswr is deleted or not

  const userRole = decoded.role;
  if(userRole === 'faculity'){
     user = await Faculity.findById(decoded.id);

    if(!user){
      return next(new AppError('sorry we could not identify you please contact the admin',404));
    }
  }
  if(userRole === 'student'){
     user = await Student.findById(decoded.id);
    
    
    if(!user){
      return next(new AppError('you are not the student of this institute, If some Error please notify the authority immedaitely',404));
    }
  }
  
  

  //grant  Access
  req.user = user;
  next();
    
});

exports.roleChecker = (req,res,next) => {
  if(req.user.role === 'student'){
    return next(new AppError('you are not authorized to access this route',401));
  }
  next();

}

exports.logout = catchAsync(async (req,res,next)=>{
  res.clearCookie('jwt');
  res.status(200).json({
    status:'success',
    message:'you have been successfukky logged out'
  });
})

exports.checkPayload = catchAsync(async (req,res,next)=>{

  const Cstudent = await Student.findOne({student_no:req.body.student_no});

  if(req.body.full_name.toLowerCase() !== Cstudent.full_name.toLowerCase()){
     return next(new AppError('entered data does not matched with the record',400));
  }
  if(req.body.full_name.toLowerCase() !== Cstudent.full_name.toLowerCase()){
    return next(new AppError('entered data does not matched with the record',400));
 }
 if(req.body.student_no !== Cstudent.student_no){
  return next(new AppError('entered data does not matched with the record',400));
}
if(req.body.roll_no !== Cstudent.roll_no){
  return next(new AppError('entered data does not matched with the record',400));
}
if(req.body.year !== Cstudent.year){
  return next(new AppError('entered data does not matched with the record',400));
}
if(req.body.course.toLowerCase() !== Cstudent.course.toLowerCase()){
  return next(new AppError('entered data does not matched with the record',400));
}
if(req.body.branch.toLowerCase() !== Cstudent.branch.toLowerCase()){
  return next(new AppError('entered data does not matched with the record',400));
}
if(req.body.email.toLowerCase() !== Cstudent.email.toLowerCase()){
  return next(new AppError('entered data does not matched with the record',400));
}
if(req.body.father_name.toLowerCase() !== Cstudent.father_name.toLowerCase()){
  return next(new AppError('entered data does not matched with the record',400));
}
  next();
});












