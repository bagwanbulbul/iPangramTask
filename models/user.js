const mongoose = require("mongoose")
// var bcrypt = require('bcryptjs');

const schema = mongoose.Schema
var Float = require('mongoose-float').loadType(mongoose);

const user_login_schema = new schema({
    name: {
        type: String,
    },
    // role: {
    //     type: String,
    //     default: 'user',
    //     enum: ["admin"]
    // },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        default: ''
    }
    
}, { strict: false });
var detail = mongoose.model("User", user_login_schema)
module.exports = detail