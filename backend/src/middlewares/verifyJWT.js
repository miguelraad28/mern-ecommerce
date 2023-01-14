const jwt = require("jsonwebtoken")
const config = require("../config")
const User = require("../models/User")
const Role = require("../models/Role")

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) return res.status(403).json({ message: "Debes iniciar sesión" })
    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id
    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ message: "Vuelve a iniciar sesión" })
    next()
}

const verifyAdminToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) return res.status(403).json({ message: "Debes iniciar sesión" })
    const { id } = jwt.verify(token, config.SECRET)
    req.userId = id
    const user = await User.findById(req.userId)
    const userRole = await Role.findOne({ _id: { $in: user.roles } })
    if (userRole.name === "admin") return next()
    res.status(403).json({ message: "Requiere permisos de administrador" })
}

const tokenValidation = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    jwt.verify(token, config.SECRET, async function (err, decoded) {
        if (err) {
            res.json({ err: err, message: "Sesión expirada, vuelve a iniciar" })
        } else {
            req.userId = decoded.id
            const userFound = await User.findOne({ _id: req.userId })
            return res.json({ ...userFound._doc, token })
        }
    })
}

module.exports = { verifyToken, verifyAdminToken, tokenValidation }