import User from "../models/User.model.js";
import CustomError from "../utils/customerError.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user)
    return next(new CustomError("User not found", 404));

  res.status(200).json({ message: "Get user successfully", data: user });
};

export const getAll = async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({ message: "Get all user successfully", data: users });
};


export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, age, phoneNumber, phoneWhatsApp } = req.body;

  const user = await User.findByIdAndUpdate(id, {
    firstName, lastName, age, phoneNumber, phoneWhatsApp
  }, { new: true });

  if (!user)
    return next(new CustomError("User not found", 404));

  res.status(200).json({ message: "Update user successfully", data: user });
}

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user)
    return next(new CustomError("User not found", 404));

  res.status(200).json({ message: "Delete user successfully" });
}