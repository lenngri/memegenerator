const express = require('express');
const router = express.Router();

const { 
    retrieveSingle,
    retrieveMany,
    retrieveAll,
    uploadSingle
}  = require('../controller/template.controller')

router.route('/retrieveSingle').get(retrieveSingle),
// router.route('/retrieveMany').get(retrieveMany),
router.route('/retrieveAll').get(retrieveAll),
router.route('/uploadSingle').post(uploadSingle)

module.exports = router