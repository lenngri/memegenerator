//Database schema to save a new Template to MongoDB Database
//Source for model: https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

//Connection to Mongoose
const mongoose = require("mongoose");
//Schema
const Schema = mongoose.Schema;

//Template Schema
const TemplateSchema = new Schema({
    source: String,
    name: String,
    description: String,
    img: 
    {
        data: Buffer,
        contentType: String
    }
});

const Template = mongoose.model("template", TemplateSchema);
module.exports = Template;