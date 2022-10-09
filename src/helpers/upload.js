const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params: {folder: 'image',
    format: async(req, file) => {
      const formatExt = file.mimetype.split('/')[1];
      return formatExt; 
    },
    public_id: (req, file) => new Date().getTime()
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize : 5 * 1000 * 1000
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
