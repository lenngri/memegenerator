const { parseURI } = require("../../helpers/uriParser.helper");
const { fileSizeFormatter } = require("../../helpers/fileSizeFormatter.helper");
const { writeFile } = require("../../helpers/fileSaver.helper");
const { join } = require("path");

const Meme = require("../../database/models/meme.model");

exports.updateMemeService = async function (req, res) {
  console.log("running update meme route");

  try {
    if (!req.body._id) {
      return res
        .status(400)
        .json({ success: false, message: "no meme object attached" });
    } else {
      
      // queries database to find meme by memeID
      const oldMeme = await Meme.findOne({ _id: req.body._id });
      if (!oldMeme) return res.status(404).json({success: false, message: "could not find existing meme to update"});

      // parses dataURI to create file for upload to directory
      console.log("writing buffer to file");
      const data = parseURI(req.body.meme);
      const fileName = oldMeme.fileName;

      // creates file object containing file info for staging
      const file = {
        name: fileName,
        mimetype: data.extension,
        path: `uploads/meme/${req.body.userID}/${fileName}.${
          data.extension.split("/")[1]
        }`,
        size: fileSizeFormatter(data.image.toString("base64").length),
      };

      // creates newMeme object tor findOneAndUpdate function
      const newMeme = {
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
      };

      // finds meme by meme ID from request and updates with new meme object

      Meme.findOneAndUpdate({ _id: req.body._id }, newMeme, { new: true }, function (error, meme) {
          if (error) console.log(error.message);
          
          // dynamically generates URL to send along with updated meme
          const proxyHost = req.headers["x-forwarded-host"];
          const host = proxyHost ? proxyHost : req.headers.host;
          const link = "http://" + host + "/" + meme.filePath;

          res.status(200).json({
            meme: meme,
            stableURL: link,
          });

          // saves updated meme to uploads directory, overwriting old file
          writeFile(join(__dirname, "../../", oldMeme.filePath), data.image);
          console.log(
            "updated meme with ID: " + meme.id + " at " + meme.filePath
          );
        }
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
