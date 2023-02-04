const authController = {};
const jwt = require("jsonwebtoken")
const config = require("../config");
const User = require("../models/User")
const Role = require("../models/Role");
const transporter = require("../utils/nodemailer")

authController.register = async (req, res) => {
    const { name, surname, email, password, dni, roles } = req.body
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const newUser = new User({
        name,
        surname,
        email,
        password: await User.encryptPassword(password),
        dni,
        account: "pending",
        accountConfirmation: {
            confirmationCode: confirmationCode,
            confirmationCodeExpiresAt: new Date(Date.now() + 60 * 60 * 1000)
        }
    })

    if (roles) {
        const foundRole = await Role.findOne({ name: { $in: roles } })
        newUser.roles = { _id: foundRole._id, name: foundRole.name }
    } else {
        const role = await Role.findOne({ name: "client" })
        newUser.roles = { _id: role._id, name: role.name }
    }
    transporter.sendMail({
        from: 'miguelraad2020@gmail.com',
        to: req.body.email,
        subject: 'CONFIRMACION DE EMAIL',
        text: `CODIGO DE VERIFICACION DE EMAIL: ${confirmationCode.toString()}
        VE A ESTE LINK PARA VALIDAR: http://localhost:3000/verifyEmail?email=${req.body.email}`
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    await newUser.save()
    res.json({ message: `Cuenta creada, valida tu email con el código enviado a ${email}`, pending: true })
}
authController.resendConfirmationCode = async (req, res) => {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const user = await User.findOne({ email: req.body.email })
    const { accountConfirmation } = user
    accountConfirmation.confirmationCode = confirmationCode
    accountConfirmation.confirmationCodeExpiresAt = new Date(Date.now() + 60 * 60 * 1000)
    transporter.sendMail({
        from: 'miguelraad2020@gmail.com',
        to: req.body.email,
        subject: 'CONFIRMACION DE EMAIL',
        text: `CODIGO DE VERIFICACION DE EMAIL: ${confirmationCode.toString()}
        VE A ESTE LINK PARA VALIDAR: http://localhost:3000/verifyEmail?email=${req.body.email}`
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({ message: `Codigo de confirmación enviado a ${req.body.email}` })
}
authController.verifyEmail = async (req, res) => {
    const email = req.body.email
    const code = req.body.code
    const user = await User.findOne({ email: email })
    const currentTime = new Date().getTime();
    const { accountConfirmation } = user
    console.log(code, accountConfirmation.confirmationCode)
    if (currentTime < accountConfirmation.confirmationCodeExpiresAt.getTime() && accountConfirmation.confirmationCode === code) {
        user.account = "approved"
        user.save()
        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400
        })
        res.json({ user: user._doc, token })
    } else if (accountConfirmation.confirmationCode !== code) {
        res.json({ message: "Código inválido", pending: true })
    } else if (currentTime > accountConfirmation.confirmationCodeExpiresAt.getTime()) {
        res.json({ message: "El codigo ha expirado", pending: true })
    }
}
authController.login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email })

    if (userFound.account === "pending") return res.json({ message: "Debes verificar tu email para poder iniciar seisón", pending: true })

    if (!userFound) return res.json({ message: "El email no está registrado" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.json({ message: "Contraseña inválida" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ user: userFound._doc, token })
}
module.exports = authController