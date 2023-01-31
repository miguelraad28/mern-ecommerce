const usersController = {}
const User = require("../models/User")
const Sale = require("../models/Sale")

usersController.getUsers = async(req, res) => {
    res.json(await User.find())
}
usersController.getUser = async(req, res) => {
    res.json(await User.findById(req.params.userId))
}

module.exports = usersController