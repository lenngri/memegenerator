const fs = require('fs');
const{ join } = require('path');
const Meme = require('../database/models/meme.model');
// helper functions
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { removeEmpty } = require('../helpers/removeEmpty.helper')
const { writeFile } = require('../helpers/fileSaver.helper')
const { parseURI } = require('../helpers/uriParser.helper')


exports.retrieve = async function(req, res, next) {

    console.log("getting memes")

    const filters = {
        _id: req.body._id || "",
        userID: req.body.userID || "",
        templateID: req.body.templateID || "",
        title: req.body.title || "",
        private: req.body.private || "",
        newest: req.body.newest ? new Date(req.body.newest.year, req.body.newest.month-1, req.body.newest.day, 23, 59) : "",
        oldest: req.body.oldest ? new Date(req.body.oldest.year, req.body.oldest.month-1, req.body.oldest.day, 00, 00) : "",
        maxNumber: req.body.maxNumber || ""
    }
    
    const query = removeEmpty(filters)
    console.log("applying filters: " + JSON.stringify(query))

    try {

        console.log("querying database")

        let memes = await Meme.find(query)
        console.log("found " + memes.length + " memes according to query parameters")

        if (query.newest) memes = memes.filter((element) => query.oldest <= element.createdAt)

        if (query.oldest) memes = memes.filter((element) => query.newest >= element.createdAt)
        console.log(memes)

        if (query.maxNumber) memes = memes.slice(0, query.maxNumber)

        if(memes.length > 0) {
            res.status(200).json({
                meta: {
                    searchTerms: filters,
                    results: {
                        newest: new Date(Math.max.apply(null, memes.map( e => { return new Date(e.createdAt); }))),
                        oldest: new Date(Math.min.apply(null, memes.map( e => { return new Date(e.createdAt); }))),
                        totalMemes: memes.length
                    }
                },
                data: {
                    memes
                }
            })
        } else {
            res.status(500).json({
                "message" : "no memes match your query",
                "query:" : query
            })
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
    
};

// Uploads single meme and saves it to the uploads directory, along with database
exports.uploadSingle = async function(req, res, next) {

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
                path: join(`./uploads/meme/${req.body.userID}/${fileName}.${data.extension.split('/')[1]}`),
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

            await meme.save( function(error, meme) {
                if(error) console.log(error.message)
                res.status(200).json(meme)
                writeFile(meme.filePath, data.image)
                console.log("saved meme with ID: " + meme.id + " at " + meme.filePath)
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};



