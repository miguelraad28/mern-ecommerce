const { Router } = require("express")
const { getCourses, getCourse, getCartDetail } = require("../controllers/courses.controller")
const router = Router()

// router.route("/products")
// .get(getProducts)
// router.route("/products/:productId")
// .get(getProduct)
router.route("/courses")
    .get(getCourses)
router.route("/courses/:courseId")
    .get(getCourse)

router.route("/getCartDetail")
    .get(getCartDetail)

module.exports = router