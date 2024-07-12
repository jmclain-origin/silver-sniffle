import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../utils/errors';

export const basicGetRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.params) {
    const keys = Object.keys(req.params);
    for (const key in keys) {
      if (req.params[key]) {
        throw new HttpError(400, 'Invalid request');
      }
    }
  }
  try {
    res.status(200).json({
      message: 'Hello Universe!',
    });
  } catch (error: unknown) {
    next(error);
  }
};
export const getHealthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { simulateError, dbStatus, vendorStatus } = req.query;

  if (simulateError) {
    if (process.env.NODE_ENV === 'test') {
      throw new HttpError(500, 'Simulated Error');
    }
  }
  try {
    // TODO: add logic here for database and other third party services
    const dbConnection = dbStatus;
    const vendorService = vendorStatus;
    if (!dbConnection) throw new HttpError(500, 'DB connection failed');
    if (!vendorService) throw new HttpError(500, 'Vendor service failed');
    return res.status(200).json();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  getHealthCheck,
  basicGetRequest,
};
