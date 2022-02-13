const { memeFromKonvaObject } = require("../../helpers/konvaParser.helper");
const { fileSizeFormatter } = require("../../helpers/fileSizeFormatter.helper")
const { parseURI } = require("../../helpers/uriParser.helper");
const { writeFile } = require("../../helpers/fileSaver.helper")
const Template = require("../../database/models/template.model");
const Meme = require("../../database/models/meme.model")
const { join } = require("path");

exports.createManyService = async function (req, res) {
  console.log("running create many meme route");

  try {

    if (!req.body.memes) {

      return res.status(400).send({
        success: false,
        message: "No files uploaded!",
      });
      
    } else {

      // initialises new empty array for created meme objects to be pushed into
      let newMemes = []
      let newData = []

      for (entry of req.body.memes) {
      // retrieve template from database
      const template = await Template.findOne({ _id: entry.templateID });
      console.log(template)

      // create new meme from konva object
      const dataURI = await memeFromKonvaObject(entry.konva, join(__dirname, "../../", template.filePath));
      if (!dataURI) return res.status(500).json({success: false, message: "failed to create meme in konvaParser.helper"});


      // use dataURI parser helper function to create file from konva data URI
      console.log("writing buffer to file");
      const data = await parseURI(dataURI);
      const fileName = Date.now().toString();

      // create file object with upload info
      const file = {
        name: fileName,
        mimetype: data.extension,
        path: `uploads/meme/${entry.userID}/${fileName}.${
          data.extension.split("/")[1]
        }`,
        size: fileSizeFormatter(data.image.toString("base64").length),
      };

      //create meme object for upload to mongo
      const meme = new Meme({
        userID: entry.userID,
        templateID: entry.templateID,
        title: entry.title,
        description: entry.description,
        memeCaptions: entry.memeCaptions,
        fileName: file.name,
        fileType: file.mimetype,
        filePath: file.path,
        fileSize: file.size,
        konva: entry.konva,
        isPrivate: entry.isPrivate,
        isHidden: entry.isHidden,
        isDraft: entry.isDraft,
      });

      // push meme and data to newMeme and newData arrays to upload with insertMany
      newMemes.push(meme)
      newData.push(data)
    }

      await Meme.insertMany(newMemes, function (error, memes) {
        if (error) console.log(error.message);
        
        let links = [];

        const proxyHost = req.headers["x-forwarded-host"];
        const host = proxyHost ? proxyHost : req.headers.host;

        for (i in memes) {
        writeFile(join(__dirname, "../../", memes[i].filePath), newData[i].image);
        console.log("saved meme with ID: " + memes[i].id + " at " + memes[i].filePath);
        const link = "http://" + host + "/" + memes[i].filePath;
        links.push(link)
        }

        res.status(200).json({
          success: true,
          links: links,
          memes: memes
        });
      
      });

    }

  } catch (error) {
    console.log(error);
  }
};
