const mongoose = require("mongoose")
const schema = mongoose.Schema
var Float = require('mongoose-float').loadType(mongoose);

var userCart = new schema({
    product:{
        type:String
    },
    userEmail:{
        type:String,
        required:true,
    }
});
var cart = mongoose.model("userCart", userCart)
module.exports = cart