const { Router } = require("express")
const router = Router()
const { changePassword, changeEmail } = require("../controllers/auth.controller")
const { getPurchases, getPurchase } = require("../controllers/purchases.controller")
const { getCourses, getCourse } = require("../controllers/courses.controller")
const {createSale} = require("../controllers/sales.controller")


router.route("/changePassword")
    .post(changePassword)
router.route("/changeEmail")
    .post(changeEmail)


router.route("/pruchases")
    .get(getPurchases)
router.route("/pruchases/:purchaseId")
    .get(getPurchase)


router.route("/courses")
    .get(getCourses)
router.route("/courses/:getCourse")
    .get(getCourse)


router.route("/checkout")
    .post(createSale)


module.exports = router