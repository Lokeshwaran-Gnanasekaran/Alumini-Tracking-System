const mongoose = require("mongoose");
const UserSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    dob:String,
    address:String,
    interest:String,
    bio:String,
    img_url:String,
    contact:String,
    jobs:{
        jobrole:String,
        company_name:String,
        company_url:String,
        position:String,
        Start:String,
        current:String,
        salary:String,
    }

})
module.exports=mongoose.model("user",UserSchema);
