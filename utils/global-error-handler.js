module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(500).json({
        status:err.status,
        err:err,
        stack:err.stack,
        message:err.message
    });
}