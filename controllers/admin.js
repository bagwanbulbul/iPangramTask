//const User = require('../models/user');
//const AddCart = require('../models/addCart');
const Product = require("../models/product")
const Order = require("../models/order")
// var bcrypt = require('bcryptjs');

//const jwt = require('jsonwebtoken')

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