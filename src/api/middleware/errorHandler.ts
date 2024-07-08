import { Request, Response, NextFunction } from 'express';
import { errorLogger } from './logger';
interface Error {
  status?: number;
  message?: string;
}

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.status ?? 500;
  const message = err.message ?? 'Internal Server Error';

  // * Response code handling logic can be injected here
  errorLogger.error(`${status} - ${message}`);
  res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
