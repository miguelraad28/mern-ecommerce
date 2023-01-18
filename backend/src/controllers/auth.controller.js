const authController = {};
const jwt = require("jsonwebtoken")
const config = require("../config");
const User = require("../models/User")
const Role = require("../models/Role");

authController.register = async (req, res) => {
    const { name, lastname, email, password, dni, roles } = req.body
    const newUser = new User({
        name,
        lastname,
        email,
        password: await User.encryptPassword(password),
        dni,
    })

    if (roles) {
        const foundRole = await Role.findOne({ name: { $in: roles } })
        newUser.roles = {_id: foundRole._id, name: foundRole.name}
    } else {
        const role = await Role.findOne({ name: "client" })
        newUser.roles = {_id: role._id, name: role.name}
    }

    const userSaved = await newUser.save()
    const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({ user: userSaved._doc, token })
}
authController.login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email })

    if (!userFound) return res.status(400).json({ message: "El email no está registrado" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ message: "Contraseña inválida" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({user: userFound._doc, token })
}
module.exports = authController