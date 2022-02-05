const express = require('express');
const router = express.Router();

const { 
    retrieve,
    uploadSingle
}  = require('../controller/template.controller')

router.route('/retrieve').get(retrieve),
router.route('/uploadSingle').post(uploadSingle)

module.exports = router