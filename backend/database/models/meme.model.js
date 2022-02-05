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
        require: [true, 'meme documents require a userID']
    },
    templateID: {
        type: String,
        required: [true, 'meme documents require a templateID']
    },
    title: {
        type: String,
        required: [true, 'meme documents require a title']
    },
    description: {
        type: String,
        required: false
    },
    memeCaptions: {
        type: Array,
        required: [true, 'meme documents require a memeCaptions']
    },
    fileName: {
        type: String,
        required: [true, 'meme documents require a fileName']
    },
    filePath: {
        type: String,
        required: [true, 'meme documents require a filePath']
    },
    fileType: {
        type: String,
        required: [true, 'meme documents require a fileType']
    },
    fileSize: {
        type: String,
        required: [true, 'meme documents require fileSize']
    },
    konva: {
        type: Object,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true,
        default: true
    },
    isHidden: {
        type: Boolean,
        required: true,
        default: true
    },
    isDraft: {
        type: Boolean,
        required: true,
        default: false
    },
    votes: [{
        _id: {
            type: Schema.Types.ObjectId,
        },
        value: {
            type: Number,
        },
        userID: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
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

    if (this.isNew && 0 === this.votes.length) {
        this.votes = [];                                                                                                                                   
      }

    next();
})


const Meme = mongoose.model("meme", MemeSchema);
module.exports = Meme;