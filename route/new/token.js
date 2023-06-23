const JWT = require("jsonwebtoken")

module.exports = function (req,res,next){
    const token = req.header('Authenticate-Number')
    if(!token) return res.status(401).send("Access Denied")

    try {
        const verified = JWT.verify(token,process.env.TOKEN_NUMBER)
        req.userCheck = verified
        next();
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}