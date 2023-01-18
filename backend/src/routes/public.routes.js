const {Router} = require("express")
const {getCourses, getCourse} = require("../controllers/courses.controller")
const router = Router()

// router.route("/products")
// .get(getProducts)
// router.route("/products/:productId")
// .get(getProduct)
router.route("/courses")
.get(getCourses)
router.route("/courses/:courseId")
.get(getCourse)


module.exports = router