const mongoose = require('mongoose')
const Meme = require('../database/models/meme.model');


exports.addComment = async function(req, res, next) {

    console.log('running addComment route')

    // guard clause to make sure meme id is set
    if (!req.body.memeID || !req.body.userID || !req.body.commentText) res.status(400).send('request missing comment info')
    
    // stores memeID in filter variable to query database
    const filter = { _id: req.body.memeID }
    console.log('applying filter: ' + JSON.stringify(filter))

    // queries meme objects to retrieve meme with ID from filter
    const meme = await Meme.findOne(filter)
    if(!meme) res.status(400).send("could not retrieve meme with id: " + meme._id)
    console.log('successfully retrieved meme with ID: ' + meme._id)

    // stores memes in comments variable
    const comments = meme.comments
    if(!comments) res.status(404).send('Meme comments could not be retrieved')
    console.log('successfully retrieved ' + comments.length + ' comment(s)')

    // creates update object from request body
    const newComment = {
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        commentText: req.body.commentText,
        createdAt: Date.now(),
    }

    // guard clause against missing or badly transcribed comment info
    if (!newComment._id || !newComment.userID || !newComment.commentText || !newComment.createdAt) res.status(404).send('comment could not be added, because comment info was missing')
    console.log('adding new comment to staging area: ' + JSON.stringify(newComment))
    comments.push(newComment)
    
    // creates update variable and pushes new comment
    const update = { comments: comments }

    // guard clause to make sure comment was pushed to update variable
    if(!update.comments.some(element => element._id === newComment._id)) res.status(404).send('adding comment failed')
    console.log("successfully staged comment for commit")

    // find meme according to filter variable and update with comments array
    // source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    Meme.findOneAndUpdate(filter, update, {new: true, strict: true}, function(error, meme){
        if(error){
            res.status(404).send(error)
        }
        res.status(200).send(meme)
        console.log('successfully updated meme and added comment with id: ' + newComment._id)
    })
};



