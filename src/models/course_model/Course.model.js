import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String, minLength: 2, maxLength: 100, required: true
  },
  description: {
    type: String, minLength: 10, maxLength: 5000, required: true
  },
  cover: {
    type: String, default: "none.png", required: true
  },
  startDate: {
    type: Date, required: true
  },
  endDate: {
    type: Date, required: true
  },
  instructor: {
    type: String, minLength: 2, maxLength: 50, required: true
  },
  subscription: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  days: [{
    type: String, required: true
  }],
  price: {
    type: Number, min: 1
  },
  category: {
    type: String,
    required: true
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }]
}, { timestamps: true });

const Course = model("Course", courseSchema);
export default Course;