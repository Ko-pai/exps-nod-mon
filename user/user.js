const mongoose = require("mongoose")


const newSchema = new mongoose.Schema({
    name: {
        type : String,
        require: true,
    },
    email: {
        type : String,
        require: true,
        min : 15,
        max : 150
    },
    password: {
        type : String,
        require: true,
        min : 6,
        max : 15
    },
    date: {
        type : Date,
        default : Date.now
    },
    
})

module.exports = mongoose.model("New",newSchema)