const mongoose = require("mongoose")
const schema = mongoose.Schema
// var Float = require('mongoose-float').loadType(mongoose);

var products = new schema({
    product:{
        type:String
    },
    productCategory:{
        type:String,
    }
});
var allProduct = mongoose.model("products", products)
module.exports = allProduct