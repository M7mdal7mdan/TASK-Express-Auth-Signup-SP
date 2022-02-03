const User = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {JWT_SECRETKEY,JWT_EXP} = require("../../config/keys");






  exports.signUp= async (req,res,next) =>{
    try{
        //encrypt password
        const saltRound =10
        const hashedPassword = await bcrypt.hash(req.body.password,saltRound);
        req.body.password = hashedPassword;
        const user = await User.create(req.body)
        //identify whats inside the token
        const payload ={
            username:user.username,
            id: user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            exp:Date.now() + JWT_EXP
        };
        //create token
        const token = jwt.sign(payload,JWT_SECRETKEY)
        res.status(201).json({token:token});
       
    } catch(error){
       next(error);
    }
 }