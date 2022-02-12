const { removeEmpty } = require('../../helpers/removeEmpty.helper')
const Meme = require('../../database/models/meme.model');

exports.retrieveMemeService = async function (req, res) {
    console.log("getting memes")

    const filters = {
        _id: req.body._id || "",
        userID: req.body.userID || "",
        templateID: req.body.templateID || "",
        title: req.body.title || "",
        isPrivate: req.body.private || "",
        isHidden: req.body.hidden || "",
        isDraft: req.body.draft || "",
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
    
}