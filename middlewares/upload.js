const multer = require("multer");
const path = require("path");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const { _id: id } = req.user;
        const newFileName = `${id}_${Date.now()}_${file.originalname}`;
        cb(null, newFileName);
    },
});

const upload = multer({ storage });

module.exports = upload;