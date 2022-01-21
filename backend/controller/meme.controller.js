const { contentType } = require('express/lib/response');
const Meme = require('../database/models/meme.model'); // Model for saving a user to the DB
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { removeEmpty } = require('../helpers/removeEmpty.helper')



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

    const filters = {
        userID: req.body.userID,
        templateID: req.body.templateID,
        title: req.body.title,
        private: req.body.private
    }
    
    const query = removeEmpty(filters)
    console.log("applying filters: " + JSON.stringify(query))

    try {

        console.log("querying database")

        const memes = await Meme.find(query)
        console.log("found " + memes.length + " memes according to query parameters")

        if(memes.length > 0) {
            res.status(200).json(memes)
        } else {
            res.status(500).json({"message" : "no memes match your query"})
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


// Uploads single meme and saves it to the uploads directory, along with database
exports.uploadSingle = async function(req, res, next) {

    console.log("posting single meme")

    try {

        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded!"
            })

        } else {

            console.log("constructing upload object")

            let file = req.files.meme

            const meme = new Meme ({
                userID:     req.body.userID,
                templateID: req.body.templateID,
                title: req.body.title,
                description: req.body.description,
                memeCaptions: req.body.memeCaptions,
                fileName: file.name,
                filePath: "./uploads/meme/" + req.body.user + "/" + file.name,
                fileType: file.mimetype,
                fileSize: fileSizeFormatter(file.size, 2),
                private: req.body.private,
                likes: req.body.likes,
                comments: req.body.comments
            })

            console.log("contacting database")

            await meme.save( function(error, meme) {
                if(error){
                    console.log(error.message)
                }
                res.status(200).send(meme)
                file.mv("./uploads/meme/" + "/" + meme.userID + "/" + meme.fileName)
                console.log("saved meme with ID: " + meme.id + " at " + meme.filePath)
            })

        }

    } catch (error) {
        res.status(500).send(error)
    }
};



