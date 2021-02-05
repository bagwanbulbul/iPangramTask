const Product = require("../models/product")
const Order = require("../models/order")
const admin = require('../models/admin')
var bcrypt = require('bcryptjs');


const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        const hashedPassword = await hashPassword(password);
        console.log(password)
        const newUser = new admin({
            name: name,
            email: email,
            password: hashedPassword,           
        });
        let response = new admin(newUser)
        response.save()
        .then((result)=>{
            res.json({statusCode:"200",statusMsj:"Successfuly Register", data:result})
        }).catch((err)=>{
            console.log("try again");
            res.send(err)
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password       
        } = req.body;
        const user = await admin.findOne({
            email:email
        });
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'))
        const accessToken = jwt.sign({
            userId: user._id
        }, 'bulbul', {
            expiresIn: "1d"
        });
        res.send("login sucessful ")
    } catch (error) {
        console.log(error);
        res.send("login failed")
    }
}

exports.edit_profile =(req,res)=>{
    const {
        name,
        password,
        email,
        user_id
    }=req.body;
    admin.updateOne({_id:user_id},
    {$set:{name:name, password: password, email:email}})
    .then(result =>{
        res.json({statusCode:"200",statusMsj:"Successfuly Update", data:result})
    }).catch(err =>{
        res.send(err)
    })
}


exports.addProduct = async(req,res)=>{
    let productDetails = {
        email:req.body.email,
        product: req.body.product,
        productCategory: req.body.productCategory,
        price: req.body.price,
        quantity: req.body.quantity
    }
    let response =new Product(productDetails)
    response.save()
    .then((result)=>{
        res.send("successfuly added")
    }).catch((err)=>{
        console.log(err);
        res.json({statusCode:"0",statusMsj:"oops! something went wrong"})
    })
}
exports.filterSearch = (req,res)=>{
    try{
        const product = req.body.product;
        Product.find({product: {$regex:product, $options:'i'}})
        .then(result =>{
            console.log(result)
            res.send(result)
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }catch(err){
        console.log(err)
        res.json({statusCode:"0",statusMsj:"Something went wrong"})
    }
}

exports.orderFilter = (req,res)=>{
    try{
        const product = req.body.product;
        Order.find({product: {$regex:product, $options:'i'}})
        .then(result =>{
            console.log(result)
            res.send(result)
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }catch(err){
        console.log(err)
        res.json({statusCode:"0",statusMsj:"Something went wrong"})
    }
}