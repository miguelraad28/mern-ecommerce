const {Router} = require("express")
const router = Router()
const {createProduct} = require("../../controllers/products.controller")

router.route("/createProduct")
.post(createProduct)

module.exports = router