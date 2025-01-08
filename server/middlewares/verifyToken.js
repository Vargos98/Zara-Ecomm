import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (err) {
    // Handle JWT errors more explicitly for debugging
    if (err.name === "TokenExpiredError") {
      return next(createError(401, "Token has expired"));
    }
    if (err.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid token"));
    }
    next(err); // Generic error handling
  }
};
