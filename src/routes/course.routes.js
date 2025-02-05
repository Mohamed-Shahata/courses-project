import { Router } from "express";
import { auth, authorizedRole } from "../middlewares/authMiddleware.js";
import * as courseController from "../controllers/course_controller/course.controller.js"
import * as videoController from "../controllers/course_controller/video.controller.js"
import expressAsyncHandler from "express-async-handler";
import { validateorCreateCourse, validateorUpdateCourse } from "../middlewares/validators/course_validator/course.validator.js";
import { validateorCreateVideo, validateorUpdateVideo } from "../middlewares/validators/course_validator/video.validator.js";
import uploadVideo from "../middlewares/upload_media/uploadVideo.js";
import uploadImage from "../middlewares/upload_media/uploadImage.js"

const router = Router();

router.post("/",
  auth,
  authorizedRole("admin"),
  uploadImage.single("image"),
  validateorCreateCourse,
  expressAsyncHandler(courseController.createCourse)
);

router.get("/:id",
  expressAsyncHandler(courseController.getCourse)
);

router.get("/",
  expressAsyncHandler(courseController.getAllCourse)
);

router.patch("/:id",
  auth,
  authorizedRole("admin"),
  uploadImage.single("image"),
  validateorUpdateCourse,
  expressAsyncHandler(courseController.updateCourse)
);

router.delete("/:id",
  auth,
  authorizedRole("admin"),
  expressAsyncHandler(courseController.deleteCourse)
);

// Video Routes
router.post("/:courseId/video",
  auth,
  authorizedRole("admin"),
  uploadVideo.single("video"),
  validateorCreateVideo,
  expressAsyncHandler(videoController.createVideo)
);

router.patch("/:courseId/video/:VideoId",
  auth,
  authorizedRole("admin"),
  uploadVideo.single("video"),
  validateorUpdateVideo,
  expressAsyncHandler(videoController.updateVideo)
);

router.delete("/:courseId/video/:VideoId",
  auth,
  authorizedRole("admin"),
  expressAsyncHandler(videoController.deleteVideo)
);

router.delete("/:courseId/video",
  auth,
  authorizedRole("admin"),
  expressAsyncHandler(videoController.deleteAllVideo)
);

router.get("/:courseId/video/:VideoId",
  auth,
  expressAsyncHandler(videoController.getSingleVideo)
);

router.get("/:courseId/video",
  auth,
  expressAsyncHandler(videoController.getAllVideo)
);

export default router;