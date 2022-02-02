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
        required: [true, 'You cannot upload a Meme without captions']
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
    likes: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: [true, "comments require a unique ObjectID"]
        },
        userID: {
            type: String,
            required: [true, 'comments require a userID']
        },
        createdAt: {
            type: Date,
            required: [true, 'likes require a creation date']
        }
}],
    comments: [{
        _id: {
            type: Schema.Types.ObjectId,
            required: [true, "comments require a unique ObjectID"]
        },
        userID: {
            type: String,
            required: [true, 'comments require a userID']

        },
        commentText: {
            type: String,
            required: [true, 'comments require a comment text']
        },
        createdAt: {
            type: Date,
            required: [true, 'comments require a creation date']
        },
        updatedAt: {
            type: Date
        }
    }]
}, {timestamps: true});

const Meme = mongoose.model("meme", MemeSchema);
module.exports = Meme;