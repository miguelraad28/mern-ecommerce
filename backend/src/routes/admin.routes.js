const { Router } = require("express")
const router = Router()
const { getSales, getSale } = require("../controllers/sales.controller")
const { getUsers, getUser } = require("../controllers/users.controller")
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require("../controllers/courses.controller")

router.route("/users")
    .get(getUsers)

router.route("/users/:userId")
    .get(getUser)

router.route("/sales")
    .get(getSales)

router.route("/sales/:saleId")
    .get(getSale)

router.route("/courses")
    .get(getCourses)

router.route("/courses/createCourse")
    .post(createCourse)

router.route("/courses/:courseId")
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse)

module.exports = router