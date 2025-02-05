import Joi from "joi";
import deleteFile from "../../../utils/deleteVideo.js";

const createCourseValidation = Joi.object({
  title: Joi.string().trim().min(2).max(100).required().messages({
    "any.required": "Title required"
  }),
  description: Joi.string().trim().min(10).max(5000).required().messages({
    "any.required": "Description required"
  }),
  startDate: Joi.date().required().messages({
    "any.required": "Start Date is required"
  }),
  endDate: Joi.date().required().messages({
    "any.required": "End Date is required"
  }),
  instructor: Joi.string().min(2).max(50).required().messages({
    "any.required": "Instructor is required"
  }),
  days: Joi.string().required().messages({
    "any.required": "Days is required"
  }),
  price: Joi.number().min(1).required().messages({
    "any.required": "Price is required"
  }),
  category: Joi.string().required().messages({
    "any.required": "Category is required"
  })
});

const updateCourseValidation = Joi.object({
  title: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().min(10).max(5000),
  startDate: Joi.date(),
  endDate: Joi.date(),
  instructor: Joi.string().min(2).max(50),
  days: Joi.string(),
  price: Joi.number().min(1),
  category: Joi.string()
});

// Genrate validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return res.status(400).json({ message: error.details.map(err => err.message) });
  }

  next();
};

export const validateorCreateCourse = validate(createCourseValidation);
export const validateorUpdateCourse = validate(updateCourseValidation);