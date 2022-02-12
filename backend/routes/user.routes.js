const express = require("express");
const router = express.Router();

const {
    register,
    login,
    forgotpassword,
    resetpassword,
    registerExternal
} = require('../controller/user.controller');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/external/register").post(registerExternal)

module.exports = router;