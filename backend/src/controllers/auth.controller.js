const authController = {};
const jwt = require("jsonwebtoken")
const config = require("../config");
const User = require("../models/User")
const Role = require("../models/Role");
const transporter = require("../utils/nodemailer")

authController.recoverPassword = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if(!user) return res.json({message: "Email no encontrado.", pending: true})
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    user.accountConfirmation.confirmationCode = confirmationCode
    user.accountConfirmation.confirmationCodeExpiresAt = new Date(Date.now() + 600_000)
    user.account = "pending"
    user.save()
    const recoverPasswordToken = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 600
    });
    transporter.sendMail({
        from: 'miguelraad2020@gmail.com',
        to: email,
        subject: 'CAMBIO DE CONTRASEÑA',
        text: `CODIGO DE VERIFICACION: ${confirmationCode.toString()}
        TAMBIÉN PUEDES ACCEDER A ESTE LINK E INGRESAR EL CODIGO: ${process.env.CORS_POLICY_FRONT_END}/recoverPasswordToken?validationToken=${recoverPasswordToken}
        TANTO EL LINK COMO EL CÓDIGO TIENEN VALIDEZ POR 10 minutos`
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({message: "El email con el código de verificación para reseteo de contraseña ha sido enviado.", navigate: `/recoverPasswordToken?validationToken=${recoverPasswordToken}`})
}

authController.recoverSession = async (req, res) => {
    const code = req.body.code
    const token = req.body.validationToken
    const decoded = jwt.verify(token, config.SECRET)
    const user = await User.findOne({ _id: decoded.id })
    const { accountConfirmation } = user
    const currentTime = new Date().getTime();
    if (currentTime < accountConfirmation.confirmationCodeExpiresAt.getTime() && accountConfirmation.confirmationCode === code) {
        user.account = "approved";
        user.save();
        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400
        });
        await User.updateOne({ _id: user._id }, { $unset: { accountConfirmation: "" } });
        return res.json({ navigate: "/changePassword", user: user, token });
    } else if (accountConfirmation.confirmationCode !== code) {
        res.json({ message: "Código inválido", pending: true })
    } else if (currentTime > accountConfirmation.confirmationCodeExpiresAt.getTime()) {
        res.json({ message: "El codigo ha expirado", pending: true })
    }
}
authController.changePassword = async(req, res) => {
    const newPassword = req.body.newPassword
    const newPasswordConfirmation = req.body.newPasswordConfirmation
    const user = req.user
    if(newPassword !== newPasswordConfirmation) return res.json({message: "Las contraseñas deben coincidir", pending: true})
    const matchPassword = await User.comparePassword(newPassword, user.password)
    if (matchPassword) return res.json({ message: "La nueva contraseña no puede ser igual a la anterior", pending: true })
    const password = await User.encryptPassword(newPassword)
    const userFound = await User.findByIdAndUpdate(user._id, { password: password })
    userFound.save()
    res.json({message: "Contraseña cambiada con éxito!", navigate: "/myaccount"})
}
authController.register = async (req, res) => {
    const { name, surname, email, password, roles } = req.body
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const newUser = new User({
        name,
        surname,
        email,
        password: await User.encryptPassword(password),
        account: "pending",
        accountConfirmation: {
            confirmationCode: confirmationCode,
            confirmationCodeExpiresAt: new Date(Date.now() + 600_000)
        }
    })

    if (roles) {
        const foundRole = await Role.findOne({ name: { $in: roles } })
        newUser.roles = { _id: foundRole._id, name: foundRole.name }
    } else {
        const role = await Role.findOne({ name: "client" })
        newUser.roles = { _id: role._id, name: role.name }
    }
    const validationToken = jwt.sign({ id: newUser._id }, config.SECRET, {
        expiresIn: 600
    });
    transporter.sendMail({
        from: 'miguelraad2020@gmail.com',
        to: req.body.email,
        subject: 'CONFIRMACION DE EMAIL',
        text: `CODIGO DE VERIFICACION DE EMAIL: ${confirmationCode.toString()}
        TAMBIÉN PUEDES ACCEDER A ESTE LINK E INGRESAR EL CODIGO: ${process.env.CORS_POLICY_FRONT_END}/verifyEmail?validationToken=${validationToken}
        TANTO EL LINK COMO EL CÓDIGO TIENEN VALIDEZ POR 10 minutos`
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    await newUser.save()
    res.json({ message: `Ya casi estamos! Valida tu email con el código enviado al email registrado`, navigate: `/verifyEmail?validationToken=${validationToken}` })
}
authController.resendValidationCode = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) return res.json({ message: "Email incorrecto.", pending: true })

    if (user.account === "approved") return res.json({ message: "Tu cuenta ya ha sido validada.", pending: true })

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const { accountConfirmation } = user
    accountConfirmation.confirmationCode = confirmationCode
    accountConfirmation.confirmationCodeExpiresAt = new Date(Date.now() + 600_000)
    const validationToken = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 600
    });
    user.save()
    transporter.sendMail({
        from: 'miguelraad2020@gmail.com',
        to: req.body.email,
        subject: 'CONFIRMACION DE EMAIL',
        text: `CODIGO DE VERIFICACION DE EMAIL: ${confirmationCode.toString()}
        VE A ESTE LINK PARA VALIDAR: ${process.env.CORS_POLICY_FRONT_END}/verifyEmail?validationToken=${validationToken}
        EL CÓDIGO DE VALIDACIÓN TIENE UNA VIGENCIA DE 10min`
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({ message: `Código de validación reenviado.`, navigate: `/verifyEmail?validationToken=${validationToken}` })
}
authController.verifyEmail = async (req, res) => {
    const code = req.code
    const user = await User.findOne({ _id: req.userId })
    const { accountConfirmation } = user
    const currentTime = new Date().getTime();
    if (currentTime < accountConfirmation.confirmationCodeExpiresAt.getTime() && accountConfirmation.confirmationCode === code) {
        user.account = "approved";
        user.save();
        const token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400
        });
        await User.updateOne({ _id: user._id }, { $unset: { accountConfirmation: "" } });
        return res.json({ message: "¡Bienvenido a INFUSA Cursos, tu cuenta ha sido activada exitosamente!", user: user, token });
    } else if (accountConfirmation.confirmationCode !== code) {
        res.json({ message: "Código inválido", pending: true })
    } else if (currentTime > accountConfirmation.confirmationCodeExpiresAt.getTime()) {
        res.json({ message: "El codigo ha expirado", pending: true })
    }
}
authController.login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email })

    if (!userFound) return res.json({ message: "El email no está registrado", pending: true })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.json({ message: "Contraseña inválida", pending: true })

    if (userFound.account === "pending") return res.json({ message: "Debes verificar tu email para poder iniciar seisón", pending: true })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ user: userFound._doc, token })
}
module.exports = authController