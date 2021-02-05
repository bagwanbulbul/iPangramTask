const User = require('../models/user');
const AddCart = require('../models/addCart');
const Product = require("../models/product")
const Order = require("../models/order")
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

exports.addCart = async(req,res)=>{
    const {product,userEmail} = req.body
    let cartDetails = {
        product: product,
        userEmail: userEmail
    }
    let response = new AddCart(cartDetails)
    response.save()
    .then((result)=>{
        User.updateOne({email:userEmail},{$push:{cart_products:result._id}})
        .then((cart_resp)=>{
            res.send("cart successfuly added")
        })
    })
    .catch((err)=>{
        console.log(err)
        res.json({statusCode:"0",statusMsj:"Please try again"})
    })
}

exports.get_user_carts = (req,res)=>{
    const {email}=req.body
    User.findOne({email:email},{cart_products:1,email:1}).populate("cart_products")
    .then((resp)=>{
        res.send(resp);
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
exports.orderProduct = (req, res)=>{
    try{
        let orderDetails = {
            email:req.body.email,
            product: req.body.product,
            productCategory: req.body.productCategory,
            price: req.body.price,
            quantity: req.body.quantity
        }
        let response =new Order(orderDetails)
        response.save()
        .then((result)=>{
            res.send("oreder successful")
        }).catch((err)=>{
            console.log(err);
            res.json({statusCode:"0",statusMsj:"oops! something went wrong"})
        })
    }catch(err){
        console.log(err)
    }
}
exports.disPlayOder = (req,res)=>{
    try{
        let email = req.body.email;
        Order.findOne({email:email})
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
