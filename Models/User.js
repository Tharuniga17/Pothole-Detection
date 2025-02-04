const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema({
    type:String,
    latitude:Number,
    longitude:Number,
    description:String,
    severity:String,
    cartype:String
});
module.exports = mongoose.model("users",userSchema)