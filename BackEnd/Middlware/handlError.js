
const NotFound = (req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(error);
}

const handlErrors = async(err,req,res,next)=>{
const statusCode = res.statusCode ===200 ? 500 : res.statusCode
let message = err.message;
if(err.name === "CastError" && err.kind === "ObjectId"){
statusCode = 404
message = "Resource not found"
}
res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'development'? err.stack : null,
})
}

module.exports = {
    NotFound,
    handlErrors
}