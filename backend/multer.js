const multer = require('multer');

const fs = require('fs');
const path = require('path');

const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split('.')[0];
        cb(null, filename + '-' + uniqueSuffix + '.png')
    },
});

exports.upload = multer({ storage: storage });