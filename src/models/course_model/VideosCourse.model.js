import { Schema, model } from "mongoose";

const videwSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String, minLength: 10, maxLength: 5000, required: true
  },
  course: {
    type: Schema.Types.ObjectId, ref: "Course", required: true
  }
}, { timestamps: true });

const Video = model("Video", videwSchema);
export default Video;