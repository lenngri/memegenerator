const { contentType } = require('express/lib/response');
const Meme = require('../database/models/meme.model'); // Model for saving a user to the DB
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')



// gets single meme by ID
exports.retrieveSingle = async function(req, res, next) {

    console.log("getting single meme")
    
    // sets ID variable from http body
    const _id = req.body.id;

    console.log("meme id set to: " + _id)

    // tries to query database and catches error
    try {
        console.log("querying database")
        const meme = await Meme.findById(_id) // uses Meme model from db models directory
        res.status(200).json(meme)
    } catch (error) {
        res.status(500).send(error.message)
    }

};

exports.retrieveMany = async function(req, res, next) {


    console.log("getting many memes")

    const userID = req.body.userID || undefined
    const templateID = req.body.templateID || undefined
    const title = req.body.title || undefined
    const private = req.body.title || undefined

    try {

        console.log("querying database")

        const memes = await Meme.find({
            userID: userID,
            templateID: templateID,
            title: title,
            private: private
        })

        if (memes.length === 0) {
            res.status(500).send("No memes match your query")
        } else {
            res.status(200).json(memes)
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
    
};

exports.retrieveAll = async function(req, res, next) {
    try {
        const memes = await Meme.find();
        res.status(200).json(memes)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.uploadSingle = async function(req, res, next) {

    try {

        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded!"
            })

        } else {

            let file = req.files.meme

            const meme = new Meme ({
                user:     req.body.user,
                template: req.body.template,
                memeInfo: req.body.memeInfo,
                fileName: file.name,
                filePath: "./uploads/meme/" + req.body.user + "/" + file.name,
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



