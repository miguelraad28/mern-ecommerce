const {Router} = require("express")
const router = Router()
const { getPurchases, getPurchase} = require("../controllers/purchases.controller.js")

router.route("/")
    .get(getPurchases)

router.route("/:purchaseId")
    .get(getPurchase)

module.exports = router