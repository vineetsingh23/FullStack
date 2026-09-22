import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from Authorization header (e.g., "Bearer <token>")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user ID or details to request object
      req.user = decoded;

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      throw new ApiError(401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }
});