const {Router} = require("express")
const router = Router()
const {checkEmail, checkDni, checkPassword} = require("../middlewares/verifySignUp")
const {autoLogInTokenValidation} = require("../middlewares/verifyJWT")
const {login, register} = require("../controllers/auth.controller")

router.route("/autoLogIn")
.get(autoLogInTokenValidation)

router.route("/login")
.post(login)

router.route("/register")
.post(checkEmail, checkDni, checkPassword, register)

module.exports = router