import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  // * this should check be unprotected route and be able to responds with the status of other services such as database connection by passing params
  return res.send('Server is running').status(200);
};
