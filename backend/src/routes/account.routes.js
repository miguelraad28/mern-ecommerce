const { Router } = require("express")
const router = Router()
const { changePassword, changeEmail, getMyPurchases, getMyPurchase, getMyCourses, getMyCourse } = require("../controllers/account.controller")


router.route("/changePassword")
    .post(changePassword)
router.route("/changeEmail")
    .post(changeEmail)


router.route("/purchases")
    .get(getMyPurchases)
    
router.route("/courses")
    .get(getMyCourses)
router.route("/courses/:getCourse")
    .get(getMyCourse)


module.exports = router