import ApiError from '../utils/apiError.js';

// Express identifies error middleware by requiring all 4 parameters: (err, req, res, next)
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // If it's not an instance of our custom ApiError class, wrap it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};