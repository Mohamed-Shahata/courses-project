import User from "../models/User.model.js";
import CustomError from "../utils/customerError.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../service/emailService.js";
import { genrateAccessToken, genrateRefreshToken, verifyRefreshToken } from "../utils/token.js";


export const register = async (req, res, next) => {
  const { firstName, lastName, age, email, phoneNumber, phoneWhatsApp, password, confirmPass } = req.body;

  const userExsits = await User.findOne({ email });
  if (userExsits)
    return next(new CustomError("User already exsits", 400));

  if (password !== confirmPass)
    return next(new CustomError("Password must be confirmPassword", 400));

  const newUser = await User.create({
    firstName, lastName, age, email, phoneNumber, phoneWhatsApp, password
  });

  await sendEmail(email, "Welcom to course", "Hello user");

  res.status(201).json({ message: "Register successflly", data: newUser });
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return next(new CustomError("Invalid email or password", 404));

  if (!user && !(await bcryptjs.compare(password, user.password)))
    return next(new CustomError("Invalid email or password"));

  const payload = { id: user._id, role: user.role };

  // Genrate Access and Refresh Token
  const accessToken = genrateAccessToken(payload);
  const refreshToken = genrateRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  // Delete password from response
  const userData = user.toObject();
  delete userData.password;
  delete userData.refreshToken;

  // Set refresh token on cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({ message: "login successfully", accessToken, refreshToken, data: userData });
}

export const logout = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return next(new CustomError("No refresh token provided"), 204);

  const user = await User.findOne({ refreshToken });

  if (!user)
    return next(new CustomError("User not found", 204));

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });

  res.status(200).json({ message: "Logout successfully" });
}


export const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return next(new CustomError("No refresh token provided"), 403);

  const user = await User.findOne({ refreshToken });

  if (!user)
    return next(new CustomError("User not found", 404));

  const isMatch = verifyRefreshToken(refreshToken);
  if (isMatch === null)
    return next(new CustomError("Invalid refresh token", 403));

  const newAccessToken = genrateAccessToken({ id: user._id, role: user.role });
  const newRefreshToken = genrateRefreshToken({ id: user._id, role: user.role });

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(201).json({ message: "Created Access Token Successfully", accessToken: newAccessToken });
}