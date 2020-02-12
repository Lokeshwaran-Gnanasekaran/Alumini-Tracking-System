const mongoose = require("mongoose");
const Companyschema= mongoose.Schema({
    company_name:String,
    company_url:String,
    Address:String,
    logo_url:String
})
module.exports=mongoose.model("company",Companyschema);