const fs = require("fs/promises");
const path = require("path");

exports.writeFile = async function (filePath, data) {
    console.log('uploading file with fileSaver.helper')
    try {
      const dirname = path.dirname(filePath);
      const exist = await isExists(dirname);
      if (!exist) {
        await fs.mkdir(dirname, { recursive: true });
      }
  
      await fs.writeFile(filePath, data, "base64");
    } catch (err) {
      throw new Error(err);
    }
  };


// support functions

isExists = async function (path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};
