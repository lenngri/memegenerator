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
      res.send({
        status: false,
        message: "No file uploaded!",
      });
    } else {
      // retrieve template from database
      const template = await Template.findOne({ _id: req.body.templateID });

      // create new meme from konva object
      const dataURI = memeFromKonvaObject(req.body.konva, join(__dirname, "/../../" + template.filePath));
      if (!dataURI) console.log("failed to create meme in konvaParser.helper");

      console.log("constructing upload object");

      console.log("writing buffer to file");
      const data = parseURI(dataURI);
      const fileName = Date.now().toString();

      const file = {
        name: fileName,
        mimetype: data.extension,
        path: `/uploads/meme/${req.body.userID}/${fileName}.${

          data.extension.split("/")[1]
        }`,
        size: fileSizeFormatter(data.image.toString("base64").length),
      };

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
        const proxyHost = req.headers["x-forwarded-host"];
        const host = proxyHost ? proxyHost : req.headers.host;
        const stableURL = "http://" + host + "/overview/" + meme._id;
        res.status(200).json({
          meme: meme,
          stableURL: stableURL,
        });
        writeFile(join(__dirname, "../../", meme.filePath), data.image);
        console.log("saved meme with ID: " + meme.id + " at " + meme.filePath);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
