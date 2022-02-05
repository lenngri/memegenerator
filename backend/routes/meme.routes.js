const express = require('express');
const router = express.Router();

const {
    retrieve,
    uploadSingle
}  = require('../controller/meme.controller')

router.route('/retrieve').get(retrieve);
router.route('/uploadSingle').post(uploadSingle);


const {
    addComment
} = require('../controller/comment.controller')

// comment routes
router.route('/comment/add').put(addComment)

const {
    addLike
} = require('../controller/like.controller')

// like routes
router.route('/like/add').put(addLike)

module.exports = router