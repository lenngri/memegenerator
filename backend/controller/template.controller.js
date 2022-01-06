const { contentType } = require('express/lib/response');
const Template = require('../database/models/template.model'); // Model for saving a user to the DB
const multer  = require('multer')
const upload = multer({ dest: 'uploads'})

exports.uploadSingle = async function(req, res, next) {
    try {
        const file = new Template ({
            source:   req.body.source,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            description: req.body.description
        })
        await file.save();
        res.status(201).send( file.fileSize + ' uploaded successfully with name ' + file.fileName);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal = 2) => {
    if (bytes === 0) {
        return '0 bytes'
    } else {
        const dm = decimal;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', ];
        const index = Math.floor(Math.log(bytes) / Math.log(1000));
        return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
    }
}



