const { parseURI } = require("../../helpers/uriParser.helper");
const { fileSizeFormatter } = require("../../helpers/fileSizeFormatter.helper");
const { writeFile } = require("../../helpers/fileSaver.helper");
const { join } = require("path");
const fs = require("fs");

const Meme = require("../../database/models/meme.model");

exports.updateMemeService = async function (req, res) {
  console.log("running update meme route");

  try {
    if (!req.body._id) {
      return res
        .status(400)
        .json({ success: false, message: "no meme object attached" });
    } else {


        const oldMeme = await Meme.findOne({id: req.body._id})
        if(!oldMeme) return res.status(404).json({success: false, message: "could not find existing meme to update"})
      
        console.log("constructing upload object");

        console.log("writing buffer to file");
        const data = parseURI(req.body.meme);
        const fileName = oldMeme.fileName;

      const file = {
        name: fileName,
        mimetype: data.extension,
        path: `uploads/meme/${req.body.userID}/${fileName}.${data.extension.split("/")[1]}`,
        size: fileSizeFormatter(data.image.toString("base64").length),
      };

      const newMeme = ({
        userID: req.body.userID,
        templateID: req.body.templateID,
        title: req.body.title,
        description: req.body.description,
        memeCaptions: req.body.memeCaptions,
        fileName: oldMeme.fileName,
        fileType: file.mimetype,
        filePath: oldMeme.filePath,
        fileSize: file.size,
        konva: req.body.konva,
        isPrivate: req.body.isPrivate,
        isHidden: req.body.isHidden,
        isDraft: req.body.isDraft,
        votes: req.body.likes,
        comments: req.body,
      });

      console.log("contacting database");


      Meme.findOneAndUpdate({_id: req.body._id}, newMeme, {new: true}, function (error, meme) {
        if (error) console.log(error.message);
        const proxyHost = req.headers["x-forwarded-host"];
        const host = proxyHost ? proxyHost : req.headers.host;
        const link = "http://" + host + "/" + meme.filePath;

        console.log(meme)

        res.status(200).json({
          meme: meme,
          stableURL: link,
        });

        writeFile(join(__dirname, "../../", oldMeme.filePath), data.image);
        console.log("updated meme with ID: " + meme.id + " at " + meme.filePath);
      });
    }
  } catch (error) {
    res.status(500).send(error)
    console.log(error);
  }
};
