const mongoose = require("mongoose")
const schema = mongoose.Schema
// var Float = require('mongoose-float').loadType(mongoose);

var order = new schema({
    email:{
        type:String
    },
    product:{
        type:String
    },
    productCategory:{
        type:String
    },
    price:{
        type:String
    },
    quantity:{
        type:String
    }
});
var allOrder = mongoose.model("order", order)
module.exports = allOrder