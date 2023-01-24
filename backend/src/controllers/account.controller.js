const accountController = {}
const Course = require("../models/Course")
const Sale = require("../models/Sale")

accountController.getMyPurchases = async (req, res) => {
    const user = req.user
    res.json(await Sale.find({_id : user.purchases}))
}
accountController.getMyCourses = async (req, res) => {
    const user = req.user
    res.json(await Course.find({_id : user.accessTo}))
}
accountController.changePassword = async (req, res) => {

}
accountController.changeEmail = async (req, res) => {

}

module.exports = accountController