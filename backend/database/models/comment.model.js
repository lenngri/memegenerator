//Database schema to save a new Meme to MongoDB Database
//Source for model: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

//Connection to Mongoose
const mongoose = require("mongoose");
//Schema
const Schema = mongoose.Schema;

//Meme Schema
const MemeSchema = new Schema({
    userID: {
        type: String,
        require: [true, 'Please add the user, who created this meme']
    },
    memeID: {
        type: String,
        require: [true, "Every comment needs a memeID"]
    }, 
{timestamps: true});

const Meme = mongoose.model("meme", MemeSchema);
module.exports = Meme;