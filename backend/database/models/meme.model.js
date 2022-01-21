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
    templateID: {
        type: String,
        required: [true, 'Please add source of the uploaded image']
    },
    title: {
        type: String,
        required: [true, 'Please add a title to this meme']
    },
    description: {
        type: String,
        required: false
    },
    memeCaptions: {
        type: String,
        required: [true, 'You cannot upload a Meme without meme info']
    },
    fileName: {
        type: String,
        required: [true, 'File Name required']
    },
    filePath: {
        type: String,
        required: [true, 'File Path required']
    },
    fileType: {
        type: String,
        required: [true, 'File Type required']
    },
    fileSize: {
        type: String,
        required: [true, 'File Size required']
    },
    private: {
        type: Boolean,
        required: true,
        default: true
    },
    likes: {
        type: Array,
        required: true,
        default: []
    },
    comments: {
        type: Array,
        required: true,
        default: []
    }
}, {timestamps: true});

const Meme = mongoose.model("meme", MemeSchema);
module.exports = Meme;