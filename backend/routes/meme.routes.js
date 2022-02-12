const express = require('express');
const router = express.Router();

const {
    retrieve,
    retrieveRandom,
    uploadSingle,
    createSingle,
    createMany
}  = require('../controller/meme.controller')

router.route('/retrieve').get(retrieve);
router.route('/retrieve/random').get(retrieveRandom);
router.route('/uploadSingle').post(uploadSingle);
router.route('/createSingle').post(createSingle);
router.route('/createMany').post(createMany);


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