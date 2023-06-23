const verify =require("./new/token")
const post = require("express").Router()

post.get("/",verify,(req,res)=>{
    res.send("Authication good")
})

module.exports = post