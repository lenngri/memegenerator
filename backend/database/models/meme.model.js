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
        },
        userID: {
            type: String,
        },
        createdAt: {
            type: Date,
        }
    }],
    comments: [{
        _id: {
            type: Schema.Types.ObjectId,
        },
        userID: {
            type: String,
        },
        commentText: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date
        }
    }]
}, {timestamps: true});

MemeSchema.pre('save', async function (next) {
    if (this.isNew && 0 === this.comments.length) {
      this.comments = [];                                                                                                                                   
    }

    if (this.isNew && 0 === this.likes.length) {
        this.likes = [];                                                                                                                                   
      }

    next();
})


const Meme = mongoose.model("meme", MemeSchema);
module.exports = Meme;