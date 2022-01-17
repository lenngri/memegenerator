const { contentType } = require('express/lib/response');
const Meme = require('../database/models/meme.model'); // Model for saving a user to the DB
const multer  = require('multer')
const upload = multer({ dest: 'uploads'})
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')

exports.uploadSingle = async function(req, res, next) {
    try {
        const file = new Meme ({
            user:     req.body.user,
            template: req.body.template,
            memeInfo: req.body.memeInfo,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            description: req.body.description
        })
        await file.save( function(error, meme){
            if(error){
                console.log(error.message)
            }
            res.status(200).send(meme)
            console.log('Saved meme with ID: ' + meme.id)
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};



