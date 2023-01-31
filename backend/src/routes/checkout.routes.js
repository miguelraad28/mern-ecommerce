const { Router } = require("express")
const router = Router()
const { createSale, verifyPayment } = require("../controllers/sales.controller")

router.route("/")
    .post(createSale)

router.route("/verifyPayment")
    .post(verifyPayment)

module.exports = router