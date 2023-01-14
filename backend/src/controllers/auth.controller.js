const authController = {};
const jwt = require("jsonwebtoken")
const config = require("../config");
const User = require("../models/User")
const Role = require("../models/Role");

authController.register = async (req, res) => {
    const { name, lastname, email, password, dni, roles, purchases } = req.body
    const newUser = new User({
        name,
        lastname,
        email,
        password: await User.encryptPassword(password),
        dni,
        purchases
    })

    if (roles) {
        const foundRole = await Role.findOne({ nombre: { $in: roles } })
        newUser.roles = foundRole._id
    } else {
        const role = await Role.findOne({ nombre: "client" })
        newUser.roles = [role._id]
    }

    const userSaved = await newUser.save()
    userSaved = await newUser
    const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({ ...userSaved._doc, token })
}
authController.login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email })

    if (!userFound) return res.status(400).json({ message: "El email no está registrado" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ message: "Contraseña inválida" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })
    console.log(userFound)
    res.json({...userFound._doc, token })
}

module.exports = authController