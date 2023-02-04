const {Router} = require("express")
const router = Router()
const {checkEmail, checkDni, checkPassword} = require("../middlewares/verifySignUp")
const {autoLogInTokenValidation} = require("../middlewares/verifyJWT")
const {register, verifyEmail, resendConfirmationCode, login} = require("../controllers/auth.controller")

router.route("/autoLogIn")
.get(autoLogInTokenValidation)

router.route("/login")
.post(login)

router.route("/register")
.post(checkEmail, checkDni, checkPassword, register)

router.route("/verifyEmail")
.post(verifyEmail)

router.route("/resendConfirmationCode")
.post(resendConfirmationCode)

module.exports = router