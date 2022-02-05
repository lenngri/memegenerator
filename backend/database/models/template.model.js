//Database schema to save a new Template to MongoDB Database
//Source for model: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

//Connection to Mongoose
const mongoose = require("mongoose");
//Schema
const Schema = mongoose.Schema;

//Template Schema
const TemplateSchema = new Schema({
    userID: {
        type: String,
        required: [true, 'Every template needs an originating user']
    },
    source: {
        type: String,
        required: [true, 'Please add source of the uploaded image']
    },
    fileName: {
        type: String,
        required: [true, 'File Name required']
    },
    filePath: {
        type: String,
        required: [false, 'File Path required']
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
    },
    isPrivate: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

const Template = mongoose.model("template", TemplateSchema);
module.exports = Template;