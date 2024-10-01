const jwt = require("jsonwebtoken")
const User = require("../models/user")

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.podcasterUserToken;
    try{
        if(token){
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.id)
            if(!user){
                return res.status(404).json({message: "User not found"})
            }

            // If the user is found, the user object is attached to the req object.
            req.user = user
            next()
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Invalid Token"})
    }
}

module.exports = authMiddleware;
 