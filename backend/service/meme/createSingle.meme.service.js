const { memeFromKonvaObject } = require("../../helpers/konvaParser.helper");
const { fileSizeFormatter } = require("../../helpers/fileSizeFormatter.helper")
const { parseURI } = require("../../helpers/uriParser.helper");
const { writeFile } = require("../../helpers/fileSaver.helper")
const Template = require("../../database/models/template.model");
const Meme = require("../../database/models/meme.model")
const { join } = require("path");

exports.createSingleMemeService = async function (req, res) {
  console.log("running create single meme route");

  try {
    if (!req.body.konva) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded!",
      });
    } else {

      // retrieve template from database
      const template = await Template.findOne({ _id: req.body.templateID });

      // create new meme from konva object
      const dataURI = memeFromKonvaObject(req.body.konva, join(__dirname, "/../../" + template.filePath));
      if (!dataURI) console.log("failed to create meme in konvaParser.helper");


      // constructs image for upload from konva data URI
      console.log("writing buffer to file");
      const data = parseURI(dataURI);
      const fileName = Date.now().toString();

      // creates file upload object to stage information for file upload
      const file = {
        name: fileName,
        mimetype: data.extension,
        path: `/uploads/meme/${req.body.userID}/${fileName}.${
          data.extension.split("/")[1]
        }`,
        size: fileSizeFormatter(data.image.toString("base64").length),
      };

      // creates meme object to save to mongoDB
      const meme = new Meme({
        userID: req.body.userID,
        templateID: req.body.templateID,
        title: req.body.title,
        description: req.body.description,
        memeCaptions: req.body.memeCaptions,
        fileName: file.name,
        fileType: file.mimetype,
        filePath: file.path,
        fileSize: file.size,
        konva: req.body.konva,
        isPrivate: req.body.isPrivate,
        isHidden: req.body.isHidden,
        isDraft: req.body.isDraft,
        likes: req.body.likes,
        comments: req.body,
      });

      await meme.save(function (error, meme) {
        if (error) console.log(error.message);

        // dynamically generates URL file path to access meme image
        const proxyHost = req.headers["x-forwarded-host"];
        const host = proxyHost ? proxyHost : req.headers.host;
        const stableURL = "http://" + host + "/overview/" + meme._id;

        // returns meme object in json to frontend
        res.status(200).json({
          meme: meme,
          stableURL: stableURL,
        });

        // writes file to uploads folder in backend
        writeFile(join(__dirname, "../../", meme.filePath), data.image);
        console.log("saved meme with ID: " + meme.id + " at " + meme.filePath);
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
