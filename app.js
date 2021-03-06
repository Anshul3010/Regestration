const express = require('express');
const xss = require('xss-clean');
const mongoSanitize  = require('express-mongo-sanitize');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./utils/global-error-handler');
const fRouter = require('./routes/facultyRouter');
const sRouter = require('./routes/studentRouter');



const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
//app.use(express.cookieParser());
app.use(mongoSanitize());
app.use(xss());


app.use('/api/v1/student',sRouter);
app.use('/api/v1/faculty',fRouter);
app.use('*',(req,res,next)=>{
    res.status(404).json({
        message:'the link or route you have requested for is unavailable'
    });
});

app.use(globalErrorHandler);
module.exports = app;