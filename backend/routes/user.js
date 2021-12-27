const express = require('express');
const router = express.Router();

const {
    register,
    login,
    forgotpw,
    resetpw
} = require('../controller/user');

router.route('/register').post(register)

module.exports = router

