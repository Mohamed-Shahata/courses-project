import CustomError from "../../utils/customerError.js";
import Video from "../../models/course_model/VideosCourse.model.js";
import Course from "../../models/course_model/Course.model.js";
import deleteFile from "../../utils/deleteVideo.js";

export const createVideo = async (req, res, next) => {

  const { title, description } = req.body;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course)
    return next(new CustomError("Course not found", 404));

  if (!req.file)
    return next(new CustomError("Video is required", 400));

  const video = await Video.create({
    title, description, course: courseId, url: `/uploads/videos/${req.file.filename}`
  });

  course.videos.push(video);
  await course.save();

  res.status(201).json({ message: "Uploaded video successfully", data: video });
}

export const updateVideo = async (req, res, next) => {

  const { title, description } = req.body;
  const { courseId, VideoId } = req.params;

  const course = await Course.findById(courseId);

  if (!course)
    return next(new CustomError("Course not found", 404));

  const video = await Video.findById(VideoId);
  if (!video)
    return next(new CustomError("Video not found", 404));

  if (req.file) {
    deleteFile(video.url);
    video.url = `/uploads/videos/${req.file.filename}`
  }

  video.title = title || video.title;
  video.description = description || video.description;

  await video.save();

  res.status(201).json({ message: "Updated video successfully", data: video });
}

export const deleteVideo = async (req, res, next) => {
  const { courseId, VideoId } = req.params;

  const course = await Course.findById(courseId);

  if (!course)
    return next(new CustomError("Course not found", 404));

  const video = await Video.findByIdAndDelete(VideoId);
  if (!video)
    return next(new CustomError("Video not found", 404));

  course.videos.pop(video._id);
  await course.save();

  deleteFile(video.url);

  res.status(201).json({ message: "Delete video successfully" });
}

export const deleteAllVideo = async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("videos");

  if (!course)
    return next(new CustomError("Course not found", 404));


  for (const video of course.videos) {
    deleteFile(video.url);
    await Video.findByIdAndDelete(video._id);
  }
  course.videos = [];
  await course.save();

  res.status(201).json({ message: "Delete all videos successfully" });
}

export const getSingleVideo = async (req, res, next) => {
  const { courseId, VideoId } = req.params;

  const course = await Course.findById(courseId);

  if (!course)
    return next(new CustomError("Course not found", 404));

  const video = await Video.findByIdAndDelete(VideoId);
  if (!video)
    return next(new CustomError("Video not found", 404));

  res.status(201).json({ message: "Get video successfully", data: video });
}

export const getAllVideo = async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course)
    return next(new CustomError("Course not found", 404));

  const video = await Video.find();


  res.status(201).json({ message: "Get video successfully", data: video });
}