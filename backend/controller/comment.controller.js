const mongoose = require("mongoose");
const Meme = require("../database/models/meme.model");
const ErrorResponse = require("../helpers/errorResponse.helper");

exports.addComment = async function (req, res, next) {
  console.log("running addComment route");

  // guard clause to make sure meme id is set
  if (!req.body.memeID || !req.body.userID || !req.body.commentText)
    return res.status(400).send("request missing comment info");

  try {
    // queries meme objects to retrieve meme with ID from request body
    const meme = await Meme.findOne({ _id: req.body.memeID });
    if (!meme)
      return next(
        new ErrorResponse("could not retrieve meme with id: " + meme._id, 404)
      );

    // stores comments from retrieved meme in comments variable
    const comments = meme.comments;
    if (!comments)
      return res.status(404).send("Meme comments could not be retrieved");

    // creates newComment object from request body
    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      userID: req.body.userID,
      commentText: req.body.commentText,
      createdAt: Date.now(),
    };

    // adds new comment to comments array
    comments.push(newComment);

    // find meme according to filter variable and update with comments array
    // source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    const updatedMeme = Meme.findOneAndUpdate(
      { _id: req.body.memeID },
      { comments: comments },
      { new: true, strict: true }
    );

    if (updatedMeme) return res.status(200).send(meme);
  } catch (error) {
    next(error);
  }
};
