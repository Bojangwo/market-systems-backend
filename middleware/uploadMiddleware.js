const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes =
    /jpeg|jpg|png|webp/;

  const isValid =
    allowedTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only jpg, jpeg, png and webp allowed"
      )
    );
  }
};

module.exports = multer({
  storage,
  fileFilter
});