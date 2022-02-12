// helper functions
const { retrieveMemeService } = require('../service/meme/retrieve.meme.service')
const { uploadSingleMemeService } = require('../service/meme/uploadSingle.meme.service')
const { createSingleMemeService } = require('../service/meme/createSingle.meme.service')
const { createManyService} = require('../service/meme/createMany.meme.service')
const { updateMemeService } = require('../service/meme/update.meme.service')

// allows retrieval of memes in all constellations of search parameters
exports.retrieve = async function(req, res, next) {

    await retrieveMemeService(req, res)

};

// Uploads single meme and saves it to the uploads directory, along with database
exports.uploadSingle = async function(req, res, next) {

    await uploadSingleMemeService(req, res)

};

// allows creation of single meme on server
exports.createSingle = async function(req, res, next) {

    await createSingleMemeService(req, res)

};

// allows creation of many memes on server
exports.createMany = async function(req, res, next) {
    
    await createManyService(req, res, next)
};

exports.updateMeme = async function(req, res, next) {

    await updateMemeService(req, res, next)
    
}

