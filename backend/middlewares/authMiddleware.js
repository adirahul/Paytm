const jwt = require("jsonwebtoken")


function requireSignIn(req, res, next){
    try {
        const token = req.headers.authorization
        
        const result = jwt.verify(token, process.env.JWT_SECRET)
        req.user = result;
        if(!result){
            res.status(403).json({
                message: "Please login again"
            })
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid token!",
            error
        })
    }
}
module.exports = {
    requireSignIn
}