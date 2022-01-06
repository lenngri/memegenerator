const express = require('express');
const router = express.Router();

const {
    upload
} = require('../controller/template.controller');

router.route('/upload').post(upload)

module.exports = router

