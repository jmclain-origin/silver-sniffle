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
  try {
    // TODO: add logic here for database and other third party services
    if (dbStatus) {
      // * pass any value to toggle check
      // * connection status comes from params for test
      // * pass 0 to fail and 1 to pass
      const dbConnection = +dbStatus;
      if (!dbConnection) throw new HttpError(500, 'DB connection failed');
    }
    if (vendorStatus) {
      // * pass any value to toggle check
      // * connection status comes from params for test
      // * pass 0 to fail and 1 to pass
      const vendorService = +vendorStatus;
      if (!vendorService) throw new HttpError(500, 'Vendor service failed');
    }
    if (simulateError && process.env.NODE_ENV === 'test')
      throw new HttpError(500, 'Simulated Error');

    return res.status(200).json({ message: 'OK' });
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  getHealthCheck,
  basicGetRequest,
};
