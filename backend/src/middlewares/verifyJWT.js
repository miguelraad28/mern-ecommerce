const jwt = require("jsonwebtoken")
const config = require("../config")
const User = require("../models/User")
const Role = require("../models/Role")

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) return res.status(403).json({ message: "Debes iniciar sesión" })
    const decoded = jwt.verify(token, config.SECRET)
    const user = await User.findById(decoded.id)
    req.user = user
    if (!user) return res.status(404).json({ message: "Tu usuario no ha sido encontrado, vuelve a iniciar sesión" })
    next()
}

const verifyAccessToCourse = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    const course = req.headers["course-id"]
    if (!token) return res.status(403).json({ message: "Debes iniciar sesión" })
    const decoded = jwt.verify(token, config.SECRET)
    const user = await User.findById(decoded.id)
    req.user = user
    if (!user) return res.status(404).json({ message: "Tu usuario no ha sido encontrado, vuelve a iniciar sesión" })
    if (user.accessTo.includes(course)) {
        next()
    }else{
        return res.status(403).json({ message: "Lo siento, pero no tienes acceso a este curso "})
    }
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

const autoLogInTokenValidation = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    jwt.verify(token, config.SECRET, async function (err, decoded) {
        if (err) {
            res.json({ err: err, sessionExpired: true })
        } else {
            req.userId = decoded.id
            const userFound = await User.findOne({ _id: req.userId })
            return res.json({ user: userFound._doc, token })
        }
    })
}

module.exports = { verifyToken, verifyAccessToCourse, verifyAdminToken, autoLogInTokenValidation }