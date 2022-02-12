const express = require('express');
const router = express.Router();

const {
    retrieve,
    uploadSingle,
    createSingle
}  = require('../controller/meme.controller')

router.route('/retrieve').get(retrieve);
router.route('/uploadSingle').post(uploadSingle);
router.route('/createSingle').post(createSingle);


const {
    addComment
} = require('../controller/comment.controller')

// comment routes
router.route('/comment/add').put(addComment)

const {
    updateVote
} = require('../controller/vote.controller')

// vot routes
router.route('/vote/update').put(updateVote)

module.exports = router