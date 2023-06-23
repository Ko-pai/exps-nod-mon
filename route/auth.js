const Joi = require("@hapi/joi")



const userValidation = (data) =>{
    const schema = Joi.object({
        name : Joi.string().required(),
        email : Joi.string().required().email().min(15),
        password : Joi.string().required().min(6)
    })
    return schema.validate(data)
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email : Joi.string().required().email().min(15),
        password : Joi.string().required().min(6)
    })
    return schema.validate(data)
}

module.exports.userValidation = userValidation
module.exports.loginValidation = loginValidation