import multer from "multer";
import path from "path";
import CustomError from "../../utils/customerError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImages = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedImages.includes(file.mimetype))
    cb(null, true);
  else
    cb(new CustomError("Invalid file format", 400), false);
}

const uploadImage = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export default uploadImage;