const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("../config");

const checkEmail = async (req, res, next) => {
    const email = await User.findOne({ email: req.body.email })
    if (email) return res.json({ message: "El email con el que intentas registrarte, ya está regsitrado", pending: true })
    next();
}
const checkPassword = async (req, res, next) => {
    const { password } = req.body
    if (password.length < 8) return res.json({ message: "La contraseña debe tener al menos 8 caracteres", pending: true })
    if (password.length > 16) return res.json({ message: "La contraseña debe tener máximo 16 caracteres", pending: true })
    next();
}
const checkValidationToken = async (req, res, next) => {
    jwt.verify(req.body.validationToken, config.SECRET, async function (err, decoded) {
        if (err) {
            return res.json({ message: "Link expirado, solicita el reenvío", err: err, pending: true })
        } else {
            req.userId = decoded.id
            req.code = req.body.code
            next()
        }
    })
}
module.exports = { checkEmail, checkPassword, checkValidationToken }