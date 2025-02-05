import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  firstName: {
    type: String, minLength: 2, maxLength: 50, required: true
  },

  lastName: {
    type: String, minLength: 2, maxLength: 50, required: true
  },

  age: {
    type: Number, min: 10, max: 100, required: true
  },

  email: {
    type: String, unique: true, required: true
  },

  password: {
    type: String, minLength: 8, unique: true, required: true
  },

  phoneNumber: {
    type: String, minLength: 11, required: true
  },

  phoneWhatsApp: {
    type: String, minLength: 11, required: true
  },

  role: {
    type: String, enum: ["user", "supAdmin", "admin"], default: "user"
  },

  refreshToken: {
    type: String, default: null
  },

  isVerified: {
    type: Boolean, default: false
  },

  verificationCode: {
    type: String
  }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password"))
    return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
}

const User = model("User", userSchema);
export default User;