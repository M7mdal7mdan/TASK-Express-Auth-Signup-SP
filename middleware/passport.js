const LocalStartegy = require("passport-local").Strategy;
const User = require ("../models/User");
const bcrypt = require("bcrypt");


exports.localStartegy = new LocalStartegy(async(username,password,done) =>{
 try{
    const user = await User.findOne({username:username})
   
        //check password
        const passwordMatch = user ? await bcrypt.compare(password,user.password):false;
        if(passwordMatch){
           //go to sign in 
           done (null,user);
        }else{
             done (null,false);//401
        }
 }catch(error){
   done(error)
 }
})
