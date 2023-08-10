import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'DEV',
  },
});

// Back-end validation on file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Accept
    cb(null, true);
  } else {
    // Reject
    cb(null, false);
  }
};

// Only accept files up to 5MB
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});

const dUri = new Datauri();

const parser = new DatauriParser();

const file = parser.format(
  path.extname(req.file.originalname).toString(),
  req.file.buffer
).content;

const dataUri = (req) =>
  dUri.format(
    `${req.file.path}`.extname(req.file.originalname).toString(),
    req.file.buffer
  );

export { upload, dataUri };
