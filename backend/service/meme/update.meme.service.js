const { parseURI } = require("../../helpers/uriParser.helper");
const { fileSizeFormatter } = require("../../helpers/fileSizeFormatter.helper");
const { writeFile } = require("../../helpers/fileSaver.helper");
const { join } = require("path");
const { unlinkSync } = require("fs");

const Meme = require("../../database/models/meme.model");

exports.updateMemeService = async function (req, res) {
  console.log("running update meme route");

  try {
    if (!req.body._id) {
      return res
        .status(400)
        .json({ success: false, message: "no meme object attached" });
    } else {

        const oldMeme = Meme.findOne({id: req.body.id})
        if(!oldMeme) return res.status(404).json({success: false, message: "could not find existing meme to update"})
      
        console.log("constructing upload object");

        console.log("writing buffer to file");
        const data = parseURI(req.body.meme);
        const fileName = Date.now().toString();

      const file = {
        name: fileName,
        mimetype: data.extension,
        path: `uploads/meme/${req.body.userID}/${fileName}.${data.extension.split("/")[1]}`,
        size: fileSizeFormatter(data.image.toString("base64").length),
      };

      const newMeme = new Meme({
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
        votes: req.body.likes,
        comments: req.body,
      });

      console.log("contacting database");

      await Meme.findOneAndUpdate({_id: oldMeme.id}, newMeme, {new: true, strict: true}, function (error, meme) {
        if (error) console.log(error.message);
        const proxyHost = req.headers["x-forwarded-host"];
        const host = proxyHost ? proxyHost : req.headers.host;
        const link = "http://" + host + "/" + memes[i].filePath;
        res.status(200).json({
          meme: meme,
          stableURL: link,
        });
        writeFile(join(__dirname, "../../", meme.filePath), data.image);
        console.log("saved meme with ID: " + meme.id + " at " + meme.filePath);
        fs.unlinkSync(join(__dirname, "../../", oldMeme.filePath));
        console.log("deleted old meme with name: " + oldMeme.fileName + "");
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
