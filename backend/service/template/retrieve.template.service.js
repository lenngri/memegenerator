const { removeEmpty } = require('../../helpers/removeEmpty.helper')
const Template = require('../../database/models/template.model');

exports.retrieveTemplateService = async function (req, res) {

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
            return res.status(200).json(templates)
        } else {
            return res.status(401).json({"message" : "no templates match your query"})
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}