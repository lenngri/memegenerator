const Template = require('../database/models/template.model');
// helper functions
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { removeEmpty } = require('../helpers/removeEmpty.helper')

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
        res.status(500).send(error.message)
    }
    
};


// uploads single file and saves it to the upload folder and database
exports.uploadSingle = async function(req, res, next) {

    console.log(req.body)
    console.log(req.files)

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
                source:     req.body.source,
                fileName:   file.name,
                filePath:   "./uploads/template/" + req.body.userID + "/" + file.name,
                fileType:   file.mimetype,
                fileSize:   fileSizeFormatter(file.size, 2),
                description: req.body.description,
                private:    req.body.private
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



