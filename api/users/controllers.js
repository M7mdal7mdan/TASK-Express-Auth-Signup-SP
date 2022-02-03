const User = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {JWT_SECRETKEY,JWT_EXP} = require("../../config/keys");

const generateToken = (user) =>{
    const payload ={
        username:user.username,
        id: user.id,
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        exp:Date.now() + JWT_EXP
    };
    return jwt.sign(payload,JWT_SECRETKEY);
}




  exports.signUp= async (req,res,next) =>{
    try{
        //encrypt password
        const saltRound =10
        const hashedPassword = await bcrypt.hash(req.body.password,saltRound);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        //identify whats inside the token
        const token = generateToken(user);
        res.status(201).json({token:token});
       
    } catch(error){
       next(error);
    }
 }

 exports.signIn= async (req,res,next) =>{
    const token = generateToken(req.user);
    res.status(200).json({token:token});


 };