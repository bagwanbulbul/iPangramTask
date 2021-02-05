const express = require('express');
var user = express.Router();
user.use(express.json())
const bodyParser = require("body-parser")

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const {addProduct,filterSearch,orderFilter} = require('../controllers/admin')
router.post("/AddProduct",addProduct)
router.post("/search",filterSearch)
router.post("/OrderFilter",orderFilter)


module.exports = router