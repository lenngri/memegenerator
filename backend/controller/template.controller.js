const { join } = require('path')
const Template = require('../database/models/template.model');
// helper functions
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { removeEmpty } = require('../helpers/removeEmpty.helper')
const { parseURI } = require('../helpers/uriParser.helper')
const { writeFile } = require('../helpers/fileSaver.helper')

// allows retrieval of templates according to params sent in request body
exports.retrieve = async function(req, res, next) {


    console.log("getting templates")

    const filters = {
      _id: req.body._id || "",
      userID: req.body.userID || "",
      source: req.body.source || "",
      title: req.body.title || "",
      private: req.body.private || ""
    };

    const query = removeEmpty(filters)
    console.log("applying filters: " + JSON.stringify(query))

    try {

        console.log("querying database")

        const templates = await Template.find(query)
        console.log("found " + templates.length + " templates according to query parameters")

        if(templates.length > 0) {
            res.status(200).json(templates)
        } else {
            res.status(500).json({"message" : "no templates match your query"})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
    
};


// uploads single file and saves it to the upload folder and database
exports.uploadSingle = async function(req, res, next) {

    try {

        if (!req.body.template) {
            res.send({
                status: false,
                message: "No file uploaded!"
            })

        } else {

            console.log("constructing upload object")

            console.log("writing buffer to file")
            const data = parseURI(req.body.template)
            const fileName = Date.now().toString();
            
            file = {
                name: fileName,
                mimetype: data.extension,
                path: `/uploads/template/${req.body.userID}/${fileName}.${data.extension.split("/")[1]}`,
                size: fileSizeFormatter(data.image.toString('base64').length)
            }

            const template = new Template ({
                userID:     req.body.userID,
                source:     req.body.source,
                fileName:   file.name,
                filePath:   file.path,
                fileType:   file.mimetype,
                fileSize:   file.size,
                description: req.body.description,
                isPrivate:   req.body.isPrivate
            })

            await template.save( function(error, template) {
                if(error){
                    console.log(error.message)
                }
                res.status(200).send(template)
                writeFile(join(__dirname, '../', template.filePath), data.image)
                console.log('Saved template with ID: ' + template.id + " at " + template.filePath)
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};



