// helper functions
const { retrieveMemeService } = require('../service/meme/retrieve.meme.service')
const { uploadSingleMemeService } = require('../service/meme/uploadSingle.meme.service')
const { createSingleMemeService } = require('../service/meme/createSingle.meme.service')


exports.retrieve = async function(req, res, next) {

    await retrieveMemeService(req, res)

};

// Uploads single meme and saves it to the uploads directory, along with database
exports.uploadSingle = async function(req, res, next) {

    await uploadSingleMemeService(req, res)

};

exports.createSingle = async function(req, res, next) {

    await createSingleMemeService(req, res)

};



