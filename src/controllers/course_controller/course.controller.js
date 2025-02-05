import Course from "../../models/course_model/Course.model.js";
import CustomError from "../../utils/customerError.js";
import deleteFile from "../../utils/deleteVideo.js";

export const createCourse = async (req, res, next) => {
  const { title, description, startDate, endDate, instructor, days, price, category } = req.body;

  if (!req.file)
    return next(new CustomError("Image is required", 400));

  const newCourse = await Course.create({
    title, description, startDate, endDate, instructor, days, price, category,
    cover: `/uploads/images/${req.file.filename}`
  })

  res.status(201).json({ message: "Created a new course", data: newCourse })
};

export const getCourse = async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course)
    return next(new CustomError("Course not found", 404));

  res.status(200).json({ message: "Get successfully", data: course });
}

export const getAllCourse = async (req, res, next) => {

  const course = await Course.find();

  res.status(200).json({ message: "Get successfully", data: course });
}

export const updateCourse = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, instructor, days, price, category } = req.body;

  const course = await Course.findByIdAndUpdate(id, {
    title, description, startDate, endDate, instructor, days, price, category
  }, { new: true });
  if (!course)
    return next(new CustomError("Course not found", 404));

  if (req.file) {
    deleteFile(course.cover);
    course.cover = `/uploads/images/${req.file.filename}`
  }
  await course.save();

  res.status(200).json({ message: "Update course successfully", data: course });
}

export const deleteCourse = async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findByIdAndDelete(id);
  if (!course)
    return next(new CustomError("Course not found", 404));

  deleteFile(course.cover);

  res.status(200).json({ message: "Delete course successfully" });
}