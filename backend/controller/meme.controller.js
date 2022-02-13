const Meme = require("../database/models/meme.model");

const { filterMemes } = require('../service/meme/filter.meme.service')
const { removeEmpty } = require('../helpers/removeEmpty.helper')

// helper functions
const {
  retrieveMemeService,
} = require("../service/meme/retrieve.meme.service");
const {
  uploadSingleMemeService,
} = require("../service/meme/uploadSingle.meme.service");
const {
  createSingleMemeService,
} = require("../service/meme/createSingle.meme.service");
const {
  createManyService,
} = require("../service/meme/createMany.meme.service");
const { updateMemeService } = require("../service/meme/update.meme.service");
const ErrorResponse = require("../helpers/errorResponse.helper");

// allows retrieval of memes in all constellations of search parameters
exports.retrieve = async function (req, res, next) {
  // creates filter object from request body. replaces empty filter items with empty strings.
  const filters = {
    _id: req.body._id || "",
    userID: req.body.userID || "",
    templateID: req.body.templateID || "",
    title: req.body.title || "",
    isPrivate: req.body.private || "",
    isHidden: req.body.hidden || "",
    isDraft: req.body.draft || "",
    newest: req.body.newest ? new Date(Date.parse(req.body.newest)) : "",
    oldest: req.body.oldest ? new Date(Date.parse(req.body.oldest)) : "",
    random: req.body.random || "",
    maxNumber: req.body.maxNumber || "",
  };

  // removes empty values from filter
  const query = removeEmpty(filters);

  try {

    // queries database and returns meme array according to query filters
    let memes = await Meme.find(query);
    if (!memes) return next( new ErrorResponse("no memes match your query", 404) );

    // uses filter meme service to apply further queries to meme array
    memes = filterMemes(memes, query);
    if(memes.length === 0) return next( new ErrorResponse("no memes match your query", 404) );

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


  } catch (error) {
      next(error)
  }
};

// Uploads single meme and saves it to the uploads directory, along with database
exports.uploadSingle = async function (req, res, next) {
  await uploadSingleMemeService(req, res);
};

// allows creation of single meme on server
exports.createSingle = async function (req, res, next) {
  await createSingleMemeService(req, res);
};

// allows creation of many memes on server
exports.createMany = async function (req, res, next) {
  await createManyService(req, res, next);
};

exports.updateMeme = async function (req, res, next) {
  await updateMemeService(req, res, next);
};
