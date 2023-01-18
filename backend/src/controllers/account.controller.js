const accountController = {}
const Course = require("../models/Course")
const Sale = require("../models/Sale")

accountController.getMyPurchases = async (req, res) => {
    const user = req.user
    res.json(await Sale.find({_id : user.purchases}))
}
accountController.getMyCourses = async (req, res) => {
    res.json(await Course.find())
}
accountController.getMyCourse = async (req, res) => {
    res.json(await Course.findById(req.params.courseId))
}
accountController.verifyAccessToCourse = async (req, res) => {

}
accountController.changePassword = async (req, res) => {

}
accountController.changeEmail = async (req, res) => {

}

module.exports = accountController