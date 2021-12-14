//Database schema to save a new Meme to MongoDB Database

//Connection to Mongoose
const mongoose = require("mongoose");
//Schema
const Schema = mongoose.Schema;

//Meme Schema
const MemeSchema = new Schema({
    id: Number,
    name: String,
    created_at: String,
    fileSize: Number,
    url: String,
    filePath: String,
    width: Number,
    height: Number,
    topText: String,
    bottomText: String,
    topTextPosX: Number,
    topTextPosY: Number,
    bottomTextPosX: Number,
    bottomTextPosY: Number,
    fontStyle: String,
    fontColor: String,
    additionalPicture_id: Number,
    additionalPicture_filePath: String,
    title: String,
    share_count: Number,
    views: Number,
    likes: Number,
    comments_count: Number,
    comments: String,
});

//Create Model in MongoDB Database
module.exports = mongoose.model("meme", MemeSchema);