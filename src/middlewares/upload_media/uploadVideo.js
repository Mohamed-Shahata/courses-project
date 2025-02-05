import multer from "multer";
import path from "path";
import CustomError from "../../utils/customerError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const fileFilter = (req, file, cb) => {
  const allowedVideos = ["video/mp4", "video/mkv", "video/webm"];

  if (allowedVideos.includes(file.mimetype))
    cb(null, true);
  else
    cb(new CustomError("Invalid file format", 400), false);
}

const uploadVideo = multer({ storage, fileFilter, limits: { fileSize: 100 * 1024 * 1024 } });
export default uploadVideo;