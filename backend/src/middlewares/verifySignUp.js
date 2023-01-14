const User = require("../models/User")

const checkEmail = async (req, res, next) => {
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: "El email con el que intentas registrarte, ya está regsitrado"})
    next();
}
const checkDni = async (req, res, next) => {
    const dni = await User.findOne({dni: req.body.dni})
    if(dni) return res.status(400).json({message: "Debes estar colocando un DNI erróneo, ya ese lo tenemos registrado"})
    next();
}
const checkPassword = async (req, res, next) => {
    const {password} = req.body
    if(password.length < 8) return res.status(400).json({message: "La contraseña debe tener al menos 8 caracteres"})
    if(password.length > 16) return res.status(400).json({message: "La contraseña debe tener máximo 16 caracteres"})
    next();
}
module.exports = {checkEmail, checkDni, checkPassword}