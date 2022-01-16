//Database schema to save a new Meme to MongoDB Database
//Source for model: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

//Connection to Mongoose
const mongoose = require("mongoose");
//Schema
const Schema = mongoose.Schema;

//Meme Schema
const MemeSchema = new Schema({
    user: {
        type: ID,
        require: [true, 'Please add the user, who created this meme']
    },
    memeInfo: {
        type: JSON,
        required: [true: 'You cannot upload a Meme without meme info']
    },
    template: {
        type: String,
        required: [true, 'Please add source of the uploaded image']
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
    description: {
        type: String,
        required: false
    }
}, {timestamps: true});

const Meme = mongoose.model("meme", MemeSchema);
module.exports = Meme;