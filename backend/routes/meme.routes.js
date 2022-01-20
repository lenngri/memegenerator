const express = require('express');
const { upload } = require('../middleware/upload.middleware')
const { uploadSingle, retrieve }  = require('../controller/meme.controller')
const router = express.Router();

router.route('/uploadSingle').post(upload.single('file'), uploadSingle)
router.route('/retrieve').get(retrieve)

module.exports = router