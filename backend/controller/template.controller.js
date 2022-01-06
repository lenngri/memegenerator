const { contentType } = require('express/lib/response');
const Template = require('../database/models/template.model'); // Model for saving a user to the DB
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

exports.uploadSingle = async function(req, res, next) {
    try {
        const file = req.file;
        console.log(file)
        res.status(201).send('File uploaded successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};



