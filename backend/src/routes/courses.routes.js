const {Router} = require("express")
const router = Router()
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("../controllers/courses.controller")
const { verifyAdminToken } = require("../middlewares/verifyJWT")

router.route("/")
.get(getCourses)
router.route("/:courseId")
.get(getCourse)
router.route("/createCourse")
.post(verifyAdminToken, createCourse)
router.route("/updateCourse")
.put(verifyAdminToken, updateCourse)
router.route("/deleteCourse")
.delete(verifyAdminToken, deleteCourse)

module.exports = router