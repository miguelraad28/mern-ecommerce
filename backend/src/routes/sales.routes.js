const {Router} = require("express")
const router = Router()
const {getSales, getSale} = require("../controllers/sales.controller")

router.route("/")
.get(getSales)
router.route("/:saleId")
.get(getSale)

module.exports = router