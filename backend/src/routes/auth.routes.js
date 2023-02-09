const {Router} = require("express")
const router = Router()
const {checkEmail, checkValidationToken, checkPassword} = require("../middlewares/verifySignUp")
const {autoLogInTokenValidation} = require("../middlewares/verifyJWT")
const {register, verifyEmail, resendValidationCode, login} = require("../controllers/auth.controller")

router.route("/autoLogIn")
.get(autoLogInTokenValidation)

router.route("/login")
.post(login)

router.route("/register")
.post(checkEmail, checkPassword, register)

router.route("/verifyEmail")
.post(checkValidationToken, verifyEmail)

router.route("/resendValidationCode")
.post(resendValidationCode)

module.exports = router