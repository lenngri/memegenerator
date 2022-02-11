const { join } = require('path')
const Template = require('../database/models/template.model');
// helper functions
const { fileSizeFormatter } = require('../helpers/fileSizeFormatter.helper')
const { removeEmpty } = require('../helpers/removeEmpty.helper')
const { parseURI } = require('../helpers/uriParser.helper')
const { writeFile } = require('../helpers/fileSaver.helper');
const { retrieveTemplateService } = require('../service/template/retrieve.template.service');
const { uploadSingleMemeService } = require('../service/meme/uploadSingle.meme.service');
const { uploadSingleTemplateService } = require('../service/template/uploadSingle.template.service');

// allows retrieval of templates according to params sent in request body
exports.retrieve = async function(req, res, next) {

    retrieveTemplateService(req, res)
    
};


// uploads single file and saves it to the upload folder and database
exports.uploadSingle = async function(req, res, next) {

    uploadSingleTemplateService(req, res)

};



