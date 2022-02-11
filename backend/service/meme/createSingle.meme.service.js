const { memeFromKonvaObject } = require('../../helpers/konvaParser.helper');
const Template = require('../../database/models/template.model')
const { join } = require('path')


exports.createSingleMemeService = async function(req, res) {

    console.log("running create single meme route")


    try {

        const template = await Template.findOne({_id: req.body.templateID})
        const filePath = join(__dirname, template.filePath)

    } catch (error) {

        console.log(error)

    }


    const meme = memeFromKonvaObject(newMeme.konva, filePath) 
    if(meme) console.log("theres a meme!")
}
