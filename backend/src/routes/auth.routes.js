const {Router} = require("express")
const router = Router()
const {checkEmail, checkValidationToken, checkPassword} = require("../middlewares/verifySignUp")
const {autoLogInTokenValidation, verifyToken} = require("../middlewares/verifyJWT")
const {register, verifyEmail, resendValidationCode, login, recoverPassword, recoverSession, changePassword} = require("../controllers/auth.controller")

// Registration routes
router.route("/register")
.post(checkEmail, checkPassword, register)

router.route("/verifyEmail")
.post(checkValidationToken, verifyEmail)

router.route("/resendValidationCode")
.post(resendValidationCode)

// Login Routes

router.route("/autoLogIn")
.get(autoLogInTokenValidation)

router.route("/login")
.post(login)

// Change Password & Email Routes

router.route("/recoverPassword")
.post(recoverPassword)

router.route("/recoverSession")
.post(recoverSession)

router.route("/changePassword")
.post(verifyToken, changePassword)

module.exports = router