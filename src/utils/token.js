import jwt from "jsonwebtoken";

export const genrateAccessToken = ({ id, role }) => {
  return jwt.sign({ id, role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export const genrateRefreshToken = ({ id, role }) => {
  return jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
    if (err)
      return null;
  });
}