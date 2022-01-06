const { contentType } = require('express/lib/response');
const Template = require('../database/models/template.model'); // Model for saving a user to the DB

exports.upload = async function(req, res, next) {

    const{source, name, description, file} = req.body

    try {
        await Template.create({
            source: source,
            name: name,
            description: description,
            image: {
                data: file,
                contentType: img.contentType
            }
        })
        res.status(201).send(`Created image with name: ${name}`)
    } catch(error) {
        res.status(500).send(error.message)
    }
};



