const express = require('express');
const router = express.Router();

const {
    retrieve,
    uploadSingle,
    createSingle
}  = require('../controller/meme.controller')

router.route('/retrieve').get(retrieve);
router.route('/uploadSingle').post(uploadSingle);
router.route('/createSingle').post(createSingle)


const {
    addComment
} = require('../controller/comment.controller')

// comment routes
router.route('/comment/add').put(addComment)

const {
    addVote
} = require('../controller/vote.controller')

// like routes
router.route('/vote/add').put(addVote)

module.exports = router