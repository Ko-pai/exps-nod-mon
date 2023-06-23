const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routes = require("./route/route")
const path = require("path")
const po = require("./route/p")

dotenv.config()
//database connect
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database is connect")
})


app.use("/user",routes)
app.use("/post",po)
app.use(express.static(path.join(__dirname ,'public')))

app.listen(1500,()=>{
    console.log("Server is running on port 1500")
})