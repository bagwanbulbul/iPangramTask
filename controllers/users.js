const User = require('../models/user');
const AddCart = require('../models/addCart');
const Product = require("../models/product")
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
            password,
        } = req.body
        // let user_roles = 0;
        // if (req.body.role === "admin") {
        //     user_roles = 1
        // } 
        const hashedPassword = await hashPassword(password);
        console.log(password)
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,           
        });
        let response = new User(newUser)
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
        const user = await User.findOne({
            email
        });
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'))
        const accessToken = jwt.sign({
            userId: user._id
        }, 'bulbul', {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, {
            accessToken
        })
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
    User.updateOne({_id:user_id},
    {$set:{name:name, password: password, email:email}})
    .then(result =>{
        res.json({statusCode:"200",statusMsj:"Successfuly Update", data:result})
    }).catch(err =>{
        res.send(err)
    })
}

exports.filterSearch = (req,res)=>{
    try{
        const product = req.body.product;
        Product.find({product: product})
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

exports.addCart = async(req,res)=>{
    let cartDetails = {
        product: req.body.product,
        userEmail: req.body.userEmail
    }
    let response =new AddCart(cartDetails)
    response.save()
    .then((result)=>{
        res.send("cart successfuly added")
    })
    .catch((err)=>{
        console.log(err)
        res.json({statusCode:"0",statusMsj:"Please try again"})
    })
}
exports.addProduct = async(req,res)=>{
    let productDetails = {
        product: req.body.product,
        productCategory: req.body.productCategory
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

exports.viewProductDetails = (req,res)=>{
    try{
        Product.find({})
        .then(result =>{
            res.send(result)
        }).catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }catch(err){
        console.log(err)
         res.send("there is error")
    }
}
