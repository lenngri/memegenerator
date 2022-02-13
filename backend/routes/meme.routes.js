const express = require('express');
const router = express.Router();

const {
    retrieve,
    uploadSingle,
    createSingle,
    createMany,
    updateMeme
}  = require('../controller/meme.controller')

router.route('/retrieve').post(retrieve);
router.route('/uploadSingle').post(uploadSingle);
router.route('/createSingle').post(createSingle);
router.route('/createMany').post(createMany);
router.route('/update').put(updateMeme)


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