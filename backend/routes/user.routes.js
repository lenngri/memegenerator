const express = require("express");
const router = express.Router();

const {
    register,
    login,
    forgotpassword,
    resetpassword,
    external
} = require('../controller/user.controller');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/external").post(external)

module.exports = router;