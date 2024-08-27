const jwt =  require("jsonwebtoken")
const User = require("../Model/UserModel")
const asyncHandler = require("express-async-handler");


const protecteur = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(404)
            throw new Error("Token invalid")
        }
    }else{
        res.status(403)
        throw new Error("Not authorized to access this page")
       
    }
})

module.exports = protecteur