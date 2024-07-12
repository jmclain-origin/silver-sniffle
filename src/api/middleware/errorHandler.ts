import { Request, Response, NextFunction } from 'express';
import { errorLogger } from './logger';
import { HttpError } from '@/utils/errors';

/**
 * Middleware function to handle errors in the Express application.
 *
 * This middleware function is responsible for logging the error and sending a
 * JSON response with the appropriate status code and error message.
 *
 * @param err - The error object, which must be an instance of `HttpError`.
 * @param _req - The Express request object (not used).
 * @param res - The Express response object, used to send the error response.
 * @param _next - The Express next middleware function (not used).
 * @note error middleware should be called last in the stack
 */
const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';

  // Log the error
  errorLogger.error(`${status} - ${message} - ${err.stack}`);

  // Send the error response
  res.status(status).json({
    status,
    message,
  });
  next(req);
};

export default errorHandler;
