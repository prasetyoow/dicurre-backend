const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.__basepath, 'assets' , 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const timestamp = new Date().getTime();
    cb(null, `${timestamp}.${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize : 1 * 1000 * 1000
  },
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/png', 'image/jpeg', 'image/webp'];
    if (allowExt.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Extension is not supported');
      cb(err, false);
    }
  } 
});

module.exports = upload;
