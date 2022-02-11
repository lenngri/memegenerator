const fs = require('fs');
const{ join } = require('path');
const Meme = require('../database/models/meme.model');
// helper functions
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { writeFile } = require('../helpers/fileSaver.helper')
const { parseURI } = require('../helpers/uriParser.helper')
const { retrieveMemeService } = require('../service/meme/retrieve.meme.service')
const { uploadSingleMemeService } = require('../service/meme/uploadSingle.meme.service')


exports.retrieve = async function(req, res, next) {

    await retrieveMemeService(req, res)

};

// Uploads single meme and saves it to the uploads directory, along with database
exports.uploadSingle = async function(req, res, next) {

    await uploadSingleMemeService(req, res)

};

exports.createSingle = async function(req, res, next) {

    console.log("posting single meme")

    try {

        if (!req.body.meme) {
            res.send({
                status: false,
                message: "No file uploaded!"
            })

        } else {

            console.log("constructing upload object")

            console.log("writing buffer to file")
            const data = parseURI(req.body.meme)
            const fileName = Date.now().toString();

            const file = {
                name: fileName,
                mimetype: data.extension,
                path: `/uploads/meme/${req.body.userID}/${fileName}.${data.extension.split('/')[1]}`,
                size: fileSizeFormatter(data.image.toString('base64').length)
            }

            const meme = new Meme ({
                userID:     req.body.userID,
                templateID: req.body.templateID,
                title: req.body.title,
                description: req.body.description,
                memeCaptions: req.body.memeCaptions,
                fileName: file.name,
                fileType: file.mimetype,
                filePath: file.path,
                fileSize: file.size,
                konva: req.body.konva,
                isPrivate: req.body.isPrivate,
                isHidden: req.body.isHidden,
                isDraft: req.body.isDraft,
                likes: req.body.likes,
                comments: req.body
            })

            console.log("contacting database")
            console.log(join(__dirname, '../', meme.filePath), data.image)

            await meme.save( function(error, meme) {
                if(error) console.log(error.message)
                res.status(200).json(meme)
                writeFile(join(__dirname, '../', meme.filePath), data.image)
                console.log("saved meme with ID: " + meme.id + " at " + meme.filePath)
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};



