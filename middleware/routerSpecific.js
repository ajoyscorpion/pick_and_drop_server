const jwt = require("jsonwebtoken")

exports.signInMiddleware = (req,res,next) => {
    const token = req.headers['access-token'] 
    try {
        const {signInEmail} = jwt.verify(token,'pickanddrop')
        req.email = signInEmail
        next() 
    } catch (error) {
        res.status(400).json("Please Login")
    }
}