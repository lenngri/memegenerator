//Source: https://codingstatus.com/node-js-file-upload/
//Source: https://dev.to/aimalm/upload-single-file-in-node-js-using-express-and-multer-in-6-steps-4o9p
//Source: https://www.youtube.com/watch?v=JwGcP5RcgQg
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/' + req.body.type);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '--' + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimeptype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const upload = multer({storage: storage, filefilter: filefilter});
module.exports = { upload }