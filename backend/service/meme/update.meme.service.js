const { parseURI } = require('../../helpers/uriParser.helper');
const { fileSizeFormatter } = require('../../helpers/fileSizeFormatter.helper');
const { writeFile } = require('../../helpers/fileSaver.helper');
const { join } = require('path')

const Meme = require('../../database/models/meme.model');

exports.updateMemeService^ = async function(req, res) {

    console.log("running update meme route")

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
                path: `uploads/meme/${req.body.userID}/${fileName}.${data.extension.split('/')[1]}`,
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
                votes: req.body.likes,
                comments: req.body
            })

            console.log("contacting database")

            await meme.save( function(error, meme) {
                if(error) console.log(error.message)
                const proxyHost = req.headers["x-forwarded-host"];
                const host = proxyHost ? proxyHost : req.headers.host;
                const link = "http://" + host + "/" + memes[i].filePath;
                res.status(200).json({
                    meme: meme,
                    stableURL: link
                })
                writeFile(join(__dirname, '../../', meme.filePath), data.image)
                console.log("saved meme with ID: " + meme.id + " at " + meme.filePath)
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    
}