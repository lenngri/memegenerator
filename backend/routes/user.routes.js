const express = require("express");
const router = express.Router();

const {
    register,
    login,
    external
} = require('../controller/user.controller');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/external/register").post(external)

module.exports = router;