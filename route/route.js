const router = require("express").Router()
const newUser = require("../user/user")
const bodyParser = require("body-parser")
const { userValidation,loginValidation } = require("./auth")
const Jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.get("/",async (req,res)=>{
    const getUser = await newUser.find()
    res.json({meta : {total : getUser.length}, data : getUser})
})
 router.get("/register",(req,res)=>{
     res.sendFile(__dirname + "/UiFolder/index.html")
 })


router.post("/register",async (req,res)=>{


    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    const {error} = userValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const getUser = await newUser.findOne({email : req.body.email})
    
    if(getUser){
        return res.send("Email is already exists.")
    }

    const getName = await newUser.findOne({name : req.body.name})
    if(getName){
        return res.send("This name already use..Try another one!")
    }
    const user = new newUser({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    })

    try {
        const save = await user.save()
        
        setTimeout(()=>{
            res.sendFile(__dirname + "/UiFolder/login.html")
        },1500)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
    
    
})

 router.get("/login",(req,res)=>{
     setTimeout(()=>{
         res.sendFile(__dirname + "/UiFolder/login.html")
     },1500)
})
router.post("/login",async (req,res,next)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const getUser = await newUser.findOne({email : req.body.email})
    if(!getUser){
        return res.send("Email is not found")
    }

    const checkPassword = await bcrypt.compare(req.body.password ,getUser.password)
    if(!checkPassword){
       return res.send("Password is incorrect")
    }
    
    //token
    const token = Jwt.sign({id: getUser._id},process.env.TOKEN_NUMBER);
    res.header("auth-token",token)
    console.log(token);
    // res.sendFile(__dirname + "/UiFolder/post/easybank-landing-page-master/index.html")
    const urr = "https://ko-pai.github.io/space-tourism/"
    setTimeout(()=>{
        return res.redirect(urr)
    },2000)
})


module.exports= router