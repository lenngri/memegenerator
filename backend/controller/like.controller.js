const mongoose = require('mongoose')
const Meme = require('../database/models/meme.model');


exports.addLike = async function(req, res, next) {

    console.log('running addLike route')

    // guard clause to make sure meme id is set
    if (!req.body.memeID || !req.body.userID ) res.status(400).send('request missing like info')
    
    // stores memeID in filter variable to query database
    const filter = { _id: req.body.memeID }
    console.log('applying filter: ' + JSON.stringify(filter))

    // queries meme objects to retrieve meme with ID from filter
    const meme = await Meme.findOne(filter)
    if(!meme) res.status(400).send("could not retrieve meme with id: " + req.body.memeID)
    console.log('successfully retrieved meme with ID: ' + meme._id)

    // stores memes in likes variable
    const likes = meme.votes
    if(!likes) res.status(404).send('Meme likes could not be retrieved')
    console.log('successfully retrieved ' + likes.length + ' like(s)')

    // creates update object from request body
    const newLike = {
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        createdAt: Date.now(),
    }

    // guard clause against missing or badly transcribed like info
    if (!newLike._id || !newLike.userID || !newLike.createdAt) res.status(404).send('like could not be added, because like info was missing')
    console.log('adding new like to staging area: ' + JSON.stringify(newLike))
    likes.push(newLike)
    
    // creates update variable and pushes new like
    const update = { likes: likes }

    // guard clause to make sure like was pushed to update variable
    if(!update.likes.some(element => element._id === newLike._id)) res.status(404).send('adding like failed because it was not found in staging area')
    console.log("successfully staged like for commit")

    // find meme according to filter variable and update with likes array
    // source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    Meme.findOneAndUpdate(filter, update, {new: true, strict: true}, function(error, meme){
        if(error){
            res.status(404).send(error)
        }
        res.status(200).send(meme)
        console.log('successfully updated meme with id: ' + meme._id +', and added like with id: ' + newLike._id)
    })
};



