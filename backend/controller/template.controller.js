const { contentType } = require('express/lib/response');
const Template = require('../database/models/template.model'); // Model for saving a user to the DB
const multer  = require('multer')
const upload = multer({ dest: 'uploads'})
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')


// retrieves single template object by ID
exports.retrieveSingle = async function(req, res, next) {

    console.log("getting single template")

    // sets ID variable from http body
    const _id = req.body.id;

    console.log("set template id to: " + _id)

    // tries to query database and catches error
    try {
        console.log("querying database")
        const template = await Template.findById(_id); // uses template model from database models directory
        res.status(200).json(template)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// retrieves all templates on server
exports.retrieveAll = async function(req, res, next) {

    console.log("getting all templates")

    try {
        console.log("querying database")
        const templates = await Template.find();
        console.log("retrieved " + templates.length + " templates")
        res.status(200).json(templates)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// exports.retrieveMany = async function(req, res, next) {
//     try {
//         const templates = await Template.find();
//         res.status(200).json(templates)
//     } catch (error) {
//         res.json({message: error});
//     }
// }

exports.uploadSingle = async function(req, res, next) {
    try {

        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded!"
            })

        } else {

            let file = req.files.template

            const template = new Template ({
                user:     req.body.user,
                template: req.body.template,
                fileName: file.name,
                filePath: "./uploads/template/" + req.body.user + "/" + file.name,
                fileType: file.mimetype,
                fileSize: fileSizeFormatter(file.size, 2),
                description: req.body.description,
                memeInfo: req.body.memeInfo,
                private: req.body.private
            })

            await meme.save( function(error, meme) {
                if(error){
                    console.log(error.message)
                }
                res.status(200).send(meme)
                file.mv("./uploads/meme/" + "/" + meme.user + "/" + meme.fileName)
                console.log('Saved meme with ID: ' + meme.id)
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }
};



