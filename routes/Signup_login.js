const express = require('express');
var user = express.Router();
user.use(express.json())
const bodyParser = require("body-parser")

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const {signup,
    login,
    edit_profile,
    filterSearch,
    addCart,
    addProduct,
    get_user_carts,
    orderProduct,
    disPlayOder,
    viewProductDetails} = require('../controllers/users')
router.post("/signup",signup )
router.post("/login",login)
router.post("/updateOne",edit_profile)
router.post("/search",filterSearch)
router.post("/AddToCart",addCart)
router.post("/AddProduct",addProduct)
router.get("/viewProductDetails",viewProductDetails)
router.get("/displayCart",get_user_carts)
router.post("/oreder",orderProduct)
router.get("/DisplayOrder",disPlayOder)
module.exports = router