const express = require('express');
const { upload } = require('../middleware/upload.middleware')
const { retrieve, uploadSingle }  = require('../controller/template.controller')
const router = express.Router();

router.route('/retrieve').get(retrieve)
router.route('/uploadSingle').post(upload.single('file'), uploadSingle)

module.exports = router

