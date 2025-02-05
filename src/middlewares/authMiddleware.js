import CustomError from "../utils/customerError.js"
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
}

export const authorizedRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role))
      return next(new CustomError("Unauthorized action", 403))
    next();
  }
}

export const checkAccountOwner = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.id !== req.params.id)
    return next(new CustomError("Unauthorized action", 403))
  next();
}