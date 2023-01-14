const {Router} = require("express")
const router = Router()
const {checkEmail, checkDni, checkPassword} = require("../../middlewares/verifySignUp")
const {tokenValidation} = require("../../middlewares/verifyJWT")
const {login, register} = require("../../controllers/auth.controller")

router.route("/tokenValidation")
.get(tokenValidation)

router.route("/login")
.post(login)

router.route("/register")
.post(checkEmail, checkPassword, register)

module.exports = router