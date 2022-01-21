const { contentType } = require('express/lib/response');
const Template = require('../database/models/template.model');
const multer  = require('multer')
const upload = multer({ dest: 'uploads'})
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { removeEmpty } = require('../helpers/removeEmpty.helper')


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

exports.retrieveMany = async function(req, res, next) {


    console.log("getting many templates")

    const filters = {
        userID: req.body.userID,
        source: req.body.source,
        title: req.body.title,
        private: req.body.private
    }
    
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
        res.status(500).send(error.message)
    }
    
};


// uploads single file and saves it to the upload folder and database
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
                userID:     req.body.userID,
                source: req.body.source,
                fileName: file.name,
                filePath: "./uploads/template/" + req.body.userID + "/" + file.name,
                fileType: file.mimetype,
                fileSize: fileSizeFormatter(file.size, 2),
                description: req.body.description,
                private: req.body.private
            })

            await template.save( function(error, template) {
                if(error){
                    console.log(error.message)
                }
                res.status(200).send(template)
                file.mv("./uploads/template/" + template.userID + "/" + template.fileName)
                console.log('Saved template with ID: ' + template.id + " at " + template.filePath)
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }
};



