const { type } = require("express/lib/response");
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username:{type: String ,unique:true, required: true},
    password:{ type : String , required: true},
    email:{type: String, $regex: /@ajyaltech\.com$/ },
    firstName:String,
    lastName:String,
},
{
   timestamps: true
}


);



module.exports = mongoose.model("User",UserSchema);