import { Request, Response, NextFunction } from 'express';
import { redis } from '../app';

export class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err } as CustomError;
  error.message = err.message;

  // Log error with additional context
  const errorLog = {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  };

  console.error('Error:', errorLog);

  // Store error log in Redis for monitoring (optional)
  redis.lpush('error_logs', JSON.stringify(errorLog)).catch(console.error);
  redis.ltrim('error_logs', 0, 999).catch(console.error); // Keep only last 1000 errors

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new CustomError(message, 404);
  }

  // Mongoose duplicate key
  interface MongooseDuplicateKeyError extends Error {
    code: number;
    keyValue: { [key: string]: unknown };
  }
  const isMongooseDuplicateKeyError = (error: Error): error is MongooseDuplicateKeyError =>
    (error as MongooseDuplicateKeyError).code === 11000 && !!(error as MongooseDuplicateKeyError).keyValue;

  if (isMongooseDuplicateKeyError(err)) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = new CustomError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    type ValidationErrorObject = { [key: string]: { message?: string } };
    const maybeErrors = (err as unknown) as { errors?: ValidationErrorObject };
    const errors = maybeErrors.errors
      ? Object.values(maybeErrors.errors).map((val) => val.message ?? 'Invalid value')
      : [];
    const message = `Invalid input data: ${errors.join(', ')}`;
    error = new CustomError(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new CustomError('Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new CustomError('Token expired', 401);
  }

  // Web3 errors
  if (err.message.includes('revert')) {
    error = new CustomError('Blockchain transaction reverted', 400);
  }

  if (err.message.includes('insufficient funds')) {
    error = new CustomError('Insufficient funds for transaction', 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};