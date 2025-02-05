import Joi from "joi";
import deleteFile from "../../../utils/deleteVideo.js";

const createVideoValidator = Joi.object({
  title: Joi.string().trim().min(2).max(100).required().messages({
    "any.required": "Title required"
  }),
  description: Joi.string().trim().min(10).max(5000).required().messages({
    "any.required": "Description required"
  })
})

const updateVideoValidator = Joi.object({
  title: Joi.string().trim().min(2).max(100).messages({
    "any.required": "Title required"
  }),
  description: Joi.string().trim().min(10).max(5000).messages({
    "any.required": "Description required"
  })
})

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

export const validateorCreateVideo = validate(createVideoValidator);
export const validateorUpdateVideo = validate(updateVideoValidator);